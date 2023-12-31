import { Link, useNavigate, useParams } from "react-router-dom";
import classes from "./BrandPage.module.scss";
import { GetLargeCompany, getLargeCompany } from "../../../Api/CompanyApi";
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
    if (response == null) {
      window.location.href = "/#/404";
      return;
    }
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
              onError={(e) =>
                ((e.target as HTMLImageElement).src = Placeholder)
              }
              alt={Company?.name}
            />
          </div>
        </div>

        <span className={classes.SubHeader}>Kategorije</span>
        {Company.categories.length ? (
          <div className={classes.Categories}>
            {Company?.categories.map((category) => (
              <ShortView
                directory="categories"
                id={category.id}
                title={category.name}
                subtitle={category.numberOfProducts.toString()}
                link={`/categories/${category.id}`}
              />
            ))}
          </div>
        ) : (
          <span className={classes.NotFound}>
            Nema kategorija za ovaj brend
          </span>
        )}
        <span className={classes.SubHeader}>Subkategorije</span>
        {Company.subcategories.length ? (
          <div className={classes.Subcategories}>
            {Company?.subcategories.map((subcategory) => (
              <ShortView
                title={subcategory.name}
                subtitle={subcategory.numberOfProducts.toString()}
                directory="subcategories"
                link={`/subcategories/${subcategory.id}`}
                id={subcategory.id}
              />
            ))}
          </div>
        ) : (
          <span className={classes.NotFound}>
            Nema pronađenih subkategorija
          </span>
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
                    { label: "Ime", value: SortAttributeType.SortByName },
                    {
                      label: "Kategorija",
                      value: SortAttributeType.SortByCompanyName,
                    },
                    {
                      label: "Subkategorija",
                      value: SortAttributeType.SortBySubcategoryName,
                    },
                    { label: "Cijena", value: SortAttributeType.SortByPrice },
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
          {products?.length ? (
            <div className={classes.Products}>
              {products &&
                products.map((product) => <ProductView product={product} />)}
            </div>
          ) : (
            <span className={classes.NotFound}>Nema pronađenih proizvoda</span>
          )}
          {products?.length! > 0 && (
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
