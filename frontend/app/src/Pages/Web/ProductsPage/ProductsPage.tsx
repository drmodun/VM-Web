import {
  GetAllProps,
  ShortProduct,
  getShortProducts,
} from "../../../Api/ProductApi";
import { PageInfo } from "../../../Api/Shared";
import classes from "./ProductsPage.module.scss";
import { SortAttributeType, SortType } from "../../../Types/Enums";
import { useEffect, useState } from "react";
import Filter from "../../../Components/Web/FIlter";
import ProductView from "../../../Components/Web/ProductView";
import Switch from "../../../Components/Web/Switch";
import Pagination from "../../../Components/Web/Pagination";
export const ProductsPage = () => {
  const [products, setProducts] = useState<ShortProduct[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 0,
  });
  const [sortAttribute, setSortAttribute] = useState<SortAttributeType>(
    SortAttributeType.SortByName
  );
  //TODO: add infinite scroll on mobile
  const [type, setType] = useState<SortType>(SortType.Ascending);
  const [category, setCategory] = useState<string>();
  const [name, setName] = useState<string>();
  const [subcategory, setSubcategory] = useState<string>();
  const [company, setCompany] = useState<string>();
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [minPrice, setMinPrice] = useState<number>(0);

  const productFetcher = async (params?: GetAllProps, pageChange?: boolean) => {
    if (params) {
      setCategory(params.categoryId);
      setName(params.name);
      setSubcategory(params.subcategoryId);
      setCompany(params.companyId);
      setMaxPrice(params.maxPrice ?? 10000);
      setMinPrice(params.minPrice ?? 0);
      const response = await getShortProducts({
        "Sorting.Attribute": sortAttribute,
        "Sorting.SortType": type,
        "Pagination.PageNumber": pageInfo.page ?? 1,
        "Pagination.PageSize": 20,
        ...params,
      } as GetAllProps);
      setProducts(response?.items!);
      setPageInfo(response?.pageInfo!);
      return;
    }
    const response = await getShortProducts({
      "Sorting.Attribute": sortAttribute,
      "Sorting.SortType": type,
      "Pagination.PageNumber": pageInfo.page ?? 1,
      "Pagination.PageSize": 20,
      name: name ?? undefined,
      categoryId: category ?? undefined,
      subcategoryId: subcategory ?? undefined,
      companyId: company ?? undefined,
      //TODO: some styles need improvement
      maxPrice: maxPrice ?? undefined,
      minPrice: minPrice ?? undefined,
    } as GetAllProps);
    setProducts(response?.items!);
    if (!pageChange) setPageInfo(response?.pageInfo!);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    productFetcher(undefined, false);
  }, []);

  useEffect(() => {
    productFetcher(undefined, true);
  }, [pageInfo.page, sortAttribute, type]);

  return (
    <div className={classes.Container}>
      <div className={classes.Page}>
        <div className={classes.Filter}>
          <Filter
            filter={(params) => productFetcher(params, false)}
            maxValue={10000}
            minValue={0}
          />
          <div className={classes.Sort}>
            <div className={classes.SortUnit}>
              <span>Sort By</span>
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
            <div className={classes.SortUnit}>
              <span>Sort type</span>
              <Switch
                options={[
                  { label: "Ascending", value: SortType.Ascending },
                  { label: "Descending", value: SortType.Descending },
                ]}
                onSwitch={(value) => {
                  setType(value);
                }}
              />
            </div>
          </div>
          {products.length > 0 && pageInfo && (
            <Pagination
              currentPage={pageInfo.page ?? 1}
              totalPages={pageInfo.totalPages!}
              onPageChange={(page) =>
                setPageInfo((prev) => ({ ...prev, page: page }))
              }
            />
          )}
        </div>
        {products.length ? (
          <div className={classes.Products}>
            {products.map((product) => (
              <ProductView product={product} />
            ))}
          </div>
        ) : (
          <span className={classes.NotFound}>No products found</span>
        )}
      </div>
    </div>
  );
};
