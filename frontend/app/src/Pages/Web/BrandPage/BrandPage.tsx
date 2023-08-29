import { Link, useNavigate, useParams } from "react-router-dom";
import classes from "./BrandPage.module.scss";
import { GetLargeCompany, getLargeCompany } from "../../../Api/CompanyApi";
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

export const CompanyPage = () => {
  const { companyId } = useParams();
  const [sortAttribute, setSortAttribute] = useState<SortAttributeType>();
  const [pageInfo, setPageInfo] = useState<PageInfo>({} as PageInfo);
  const [sortType, setSortType] = useState<SortType>();
  const [Company, setCompany] = useState<GetLargeCompany>();
  const [products, setProducts] = useState<ShortProduct[]>();

  const fetchCompany = async () => {
    const response = await getLargeCompany(companyId as string);
    if (response == null) return;
    setCompany(response);
  };

  const fetchProducts = async (pageChange: boolean) => {
    const response = await getShortProducts({
      "Sorting.Attribute": sortAttribute,
      "Sorting.SortType": sortType,
      "Pagination.PageNumber": pageInfo?.page ?? 1,
      "Pagination.PageSize": 20,
      companyId: companyId as string,
    });
    if (response == null) return;
    setProducts(response.items);
    if (pageChange) return;
    setPageInfo(response.pageInfo);
  };

  useEffect(() => {
    fetchCompany();
    fetchProducts(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchCompany();
    fetchProducts(false);
    window.scrollTo(0, 0);
  }, [companyId]);

  useEffect(() => {
    fetchCompany();
    fetchProducts(true);
  }, [sortAttribute, sortType]);

  useEffect(() => {
    const element = document.getElementById("#products");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    fetchCompany();
    fetchProducts(true);
  }, [pageInfo.page]);

  return Company ? (
    <div className={classes.Container}>
      <div className={classes.Company}>
        <div className={classes.CompanyDetails}>
          <div className={classes.CompanyInfo}>
            <span className={classes.Name}>{Company?.name}</span>
            <span className={classes.Subtitle}>{Company?.description}</span>
          </div>
          <div className={classes.CompanyImage}>
            <img
              src={
                "https://media0testing.blob.core.windows.net/vm-racunala/companies/" +
                Company.id
              }
              alt={Company?.name}
            />
          </div>
        </div>

        <span className={classes.SubHeader}>Categories</span>
        <div className={classes.Categories}>
          {Company?.categories.map((category) => (
            <ShortView
              directory="categories"
              id={category.id}
              titlte={category.name}
              subtitle={category.numberOfProducts.toString()}
              link={`/categories/${category.id}`}
            />
          ))}
        </div>
        <span className={classes.SubHeader}>Subcategories</span>
        <div className={classes.Subcategories}>
          {Company?.subcategories.map((subcategory) => (
            <ShortView
              titlte={subcategory.name}
              subtitle={subcategory.numberOfProducts.toString()}
              directory="subcategories"
              link={`/subcategories/${subcategory.id}`}
              id={subcategory.id}
            />
          ))}
        </div>
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
                      label: "Category",
                      value: SortAttributeType.SortByCompanyName,
                    },
                    {
                      label: "Subcategory",
                      value: SortAttributeType.SortBySubcategoryName,
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
          <div className={classes.Products}>
            {products &&
              products.map((product) => <ProductView product={product} />)}
          </div>
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
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
