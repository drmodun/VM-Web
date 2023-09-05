import { useNavigate, useParams } from "react-router-dom";
import classes from "./CategoryPage.module.scss";
import { GetLargeCategory, getLargeCategory } from "../../../Api/CategoryApi";
import { useEffect, useState } from "react";
import Placeholder from "../../../assets/placeholder.webp";
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

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const [sortAttribute, setSortAttribute] = useState<SortAttributeType>();
  const [pageInfo, setPageInfo] = useState<PageInfo>({} as PageInfo);
  const [sortType, setSortType] = useState<SortType>();
  const [category, setCategory] = useState<GetLargeCategory>();
  const [products, setProducts] = useState<ShortProduct[]>();

  const fetchCategory = async () => {
    const response = await getLargeCategory(categoryId as string);
    if (response == null) {
      return;
    }
    setCategory(response);
  };

  const fetchProducts = async (pageChange: boolean) => {
    const response = await getShortProducts({
      "Sorting.Attribute": sortAttribute,
      "Sorting.SortType": sortType,
      "Pagination.PageNumber": pageInfo?.page ?? 1,
      "Pagination.PageSize": 20,
      categoryId: categoryId as string,
    });
    if (response == null) return;
    setProducts(response.items);
    if (pageChange) return;
    setPageInfo(response.pageInfo);
  };

  useEffect(() => {
    fetchCategory();
    fetchProducts(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchCategory();
    fetchProducts(false);
    window.scrollTo(0, 0);
  }, [categoryId]);

  useEffect(() => {
    fetchCategory();
    fetchProducts(true);
  }, [sortAttribute, sortType]);

  useEffect(() => {
    const element = document.getElementById("#products");
    element?.scrollIntoView({
      behavior: "smooth",
    });
    fetchCategory();
    fetchProducts(true);
  }, [pageInfo.page]);

  return category ? (
    <div className={classes.Container}>
      <div className={classes.Category}>
        <div className={classes.CategoryDetails}>
          <div className={classes.CategoryInfo}>
            <span className={classes.Name}>{category?.name}</span>
            <span className={classes.Subtitle}>{category?.description}</span>
          </div>
          <div className={classes.CategoryImage}>
            {category && (
              <img
                src={
                  "https://media0testing.blob.core.windows.net/vm-racunala/categories/" +
                  category?.id
                }
                alt={category?.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = Placeholder;
                }}
              />
            )}
          </div>
        </div>
        <span className={classes.SubHeader}>Subkategorije</span>
        {category.subcategories.length ? (
          <div className={classes.Subcategories}>
            {category?.subcategories.map((subcategory) => (
              <ShortView
                link={`/subcategories/${subcategory.id}`}
                id={subcategory.id}
                title={subcategory.name}
                directory="subcategories"
                subtitle={subcategory.numberOfProducts.toString()}
              />
            ))}
          </div>
        ) : (
          <span className={classes.NotFound}>
            Nema pronađenih subkategorija
          </span>
        )}
        <span className={classes.SubHeader}>Brands</span>
        {category.brands?.length! ? (
          <div className={classes.Companies}>
            {category?.brands.map((company) => (
              <ShortView
                id={company.id}
                title={company.name}
                directory="companies"
                subtitle={company.numberOfProducts.toString()}
                link={`/brands/${company.id}`}
              />
            ))}
          </div>
        ) : (
          <span className={classes.NotFound}>Nema pronađenih brendova</span>
        )}
        <div className={classes.ProductsSection}>
          <div className={classes.ProductsHeader}>
            <span className={classes.SubHeader} id="#products">
              Proizvodi
            </span>
            <div className={classes.Sorting}>
              <div className={classes.Sort}>
                <span>Sortiraj po:</span>
                <Switch
                  options={[
                    { label: "Name", value: SortAttributeType.SortByName },
                    {
                      label: "Subcategory",
                      value: SortAttributeType.SortBySubcategoryName,
                    },
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
                    { label: "Rastuće", value: SortType.Ascending },
                    { label: "Padajuće", value: SortType.Descending },
                  ]}
                  onSwitch={(value) => {
                    setSortType(value);
                  }}
                />
              </div>
            </div>
          </div>
          {products?.length! > 0 ? (
            <div className={classes.Products}>
              {products &&
                products.map((product) => <ProductView product={product} />)}
            </div>
          ) : (
            <span className={classes.NotFound}>Nema pronađenih proizvoda</span>
          )}
          <div className={classes.Pagination}>
            {pageInfo && products?.length! > 0 && (
              <Pagination
                currentPage={pageInfo.page ?? 1}
                totalPages={pageInfo.totalPages!}
                onPageChange={(page) => {
                  setPageInfo((prev) => ({ ...prev, page: page }));
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
