import { Link, useNavigate, useParams } from "react-router-dom";
import classes from "./SubcategoryPage.module.scss";
import {
  GetLargeSubcategory,
  getLargeSubcategory,
} from "../../../Api/SubcategoryApi";
import { useEffect, useState } from "react";
import Placeholder from "../../../assets/placeholder.png";
import ShortView from "../../../Components/Web/ShortView";
import ProductView from "../../../Components/Web/ProductView";
import {
  ShortProduct,
  getProducts,
  getShortProducts,
} from "../../../Api/ProductApi";
import { SortAttributeType, SortType } from "../../../Types/Enums";
import { PageInfo } from "../../../Api/Shared";
import Pagination from "../../../Components/Web/Pagination";
import Switch from "../../../Components/Web/Switch";

export const SubcategoryPage = () => {
  const { subcategoryId } = useParams();
  const [sortAttribute, setSortAttribute] = useState<SortAttributeType>();
  const [pageInfo, setPageInfo] = useState<PageInfo>({} as PageInfo);
  const [sortType, setSortType] = useState<SortType>();
  const [Subcategory, setSubcategory] = useState<GetLargeSubcategory>();
  const [products, setProducts] = useState<ShortProduct[]>();

  const fetchSubcategory = async () => {
    const response = await getLargeSubcategory(subcategoryId as string);
    if (response == null) return;
    setSubcategory(response);
  };

  const fetchProducts = async (pageChange: boolean) => {
    const response = await getShortProducts({
      "Sorting.Attribute": sortAttribute,
      "Sorting.SortType": sortType,
      "Pagination.PageNumber": pageInfo?.page ?? 1,
      "Pagination.PageSize": 20,
      subcategoryId: subcategoryId as string,
    });
    if (response == null) return;
    setProducts(response.items);
    if (pageChange) return;
    setPageInfo(response.pageInfo);
  };

  useEffect(() => {
    fetchSubcategory();
    fetchProducts(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchSubcategory();
    fetchProducts(false);
    window.scrollTo(0, 0);
  }, [subcategoryId]);

  useEffect(() => {
    fetchSubcategory();
    fetchProducts(true);
  }, [sortAttribute, sortType]);

  useEffect(() => {
    const element = document.getElementById("#products");
    element?.scrollIntoView({ behavior: "smooth" });
    fetchSubcategory();
    fetchProducts(true);
  }, [pageInfo.page]);

  return Subcategory ? (
    <div className={classes.Container}>
      <div className={classes.Subcategory}>
        <div className={classes.SubcategoryDetails}>
          <div className={classes.SubcategoryInfo}>
            <span className={classes.Name}>{Subcategory?.name}</span>
            <span className={classes.Subtitle}>{Subcategory?.description}</span>
            <Link
              to={"/categories/" + Subcategory.categoryId}
              className={classes.CategoryName}
            >
              Part of: {Subcategory.categoryName}
            </Link>
          </div>
          <div className={classes.SubcategoryImage}>
            <img
              src={
                "https://media0testing.blob.core.windows.net/vm-racunala/subcategories/" +
                Subcategory.id
              }
              alt={Subcategory?.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = Placeholder;
              }}
            />
          </div>
        </div>

        <span className={classes.SubHeader}>Brands</span>
        {Subcategory.brands.length ? (
          <div className={classes.Companies}>
            {Subcategory?.brands.map((company) => (
              <ShortView
                titlte={company.name}
                directory="companies"
                id={company.id}
                subtitle={company.numberOfProducts.toString()}
                link={`/brands/${company.id}`}
              />
            ))}
          </div>
        ) : (
          <span className={classes.NotFound}>No brands found</span>
        )}
        <div className={classes.ProductsSection}>
          <div className={classes.ProductsHeader}>
            <span className={classes.SubHeader} id="#products">
              Products
            </span>
            <div className={classes.Sorting}>
              <div className={classes.Sort}>
                <span>Sortiraj po:</span>
                <Switch
                  options={[
                    { label: "Name", value: SortAttributeType.SortByName },
                    {
                      label: "Company",
                      value: SortAttributeType.SortByCompanyName,
                    },
                    { label: "Price", value: SortAttributeType.SortByPrice },
                    {
                      label: "Profit",
                      value: SortAttributeType.SortByProfit,
                    },
                  ]}
                  onSwitch={(value) => {
                    setSortAttribute(value);
                  }}
                />
              </div>
              <div className={classes.Sort}>
                <Switch
                  options={[
                    { label: "Ascending", value: SortType.Ascending },
                    { label: "Descending", value: SortType.Descending },
                  ]}
                  onSwitch={(value) => {
                    setSortType(value);
                  }}
                />
              </div>
            </div>
          </div>
          {products?.length! ? (
            <div className={classes.Products}>
              {products &&
                products.map((product) => <ProductView product={product} />)}
            </div>
          ) : (
            <span className={classes.NotFound}>No products found</span>
          )}
          {products?.length! && (
            <div className={classes.Pagination}>
              {pageInfo && (
                <Pagination
                  currentPage={pageInfo.page ?? 1}
                  totalPages={pageInfo.totalPages!}
                  onPageChange={(page) => {
                    setPageInfo((prev) => ({ ...prev, page: page }));
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
