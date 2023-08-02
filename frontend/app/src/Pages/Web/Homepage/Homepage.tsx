import { Category, getCategories } from "../../../Api/CategoryApi";
import {
  GetAllProps,
  Product,
  ShortProduct,
  getProducts,
  getShortProducts,
} from "../../../Api/ProductApi";
import CategoryView from "../../../Components/Web/CategoryView";
import ProductView from "../../../Components/Web/ProductView";
import { SortAttributeType, SortType } from "../../../Types/Enums";
import classes from "./Homepage.module.scss";
import { useEffect, useState } from "react";
import { Login } from "../../../Components/Web/Login/Login";
import Placeholder from "../../../assets/placeholder.png";
import close from "../../../assets/close.svg";
import Input from "../../../Components/Web/Input";
import Register from "../../../Components/Web/Register";
import MainProductView from "../../../Components/Web/MainProductView";
import SimilarProducts from "../../../Components/Web/SimilarProducts";
import SpecificationView from "../../../Components/Web/SpecificationView";
import { Service, getServices } from "../../../Api/ServiceApi";
import ServiceView from "../../../Components/Web/Service";
import Dropdown from "../../../Components/Web/Dropdown";
import Slider from "../../../Components/Web/Slider";
import Filter from "../../../Components/Web/FIlter";
import { Pagination } from "../../../Components/Web/Pagination/Pagination";
import { PageInfo } from "../../../Api/Shared";
export const Homepage = () => {
  const [products, setProducts] = useState<ShortProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>();
  const [name, setName] = useState("");
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const productFetcher = async (params?: GetAllProps) => {
    const response = await getShortProducts({
      "Sorting.Attribute": SortAttributeType.SortByProfit,
      "Sorting.SortType": SortType.Descending,
      "Pagination.PageNumber": currentPage,
      "Pagination.PageSize": 10,
      ...params,
    });
    setProducts(response?.items!);
    setPageInfo(response?.pageInfo!);
  };

  const serviceFetcher = async () => {
    const response = await getServices();
    setServices(response?.items!);
  };

  const categoryFetcher = async () => {
    const response = await getCategories({
      "Sorting.Attribute": SortAttributeType.SortByName,
      "Sorting.SortType": SortType.Descending,
    });
    setCategories(response?.items!);
  };

  useEffect(() => {
    productFetcher();
    categoryFetcher();
    serviceFetcher();
  }, []);

  useEffect(() => {
    productFetcher();
  }, [currentPage]);

  return (
    <div>
      <h1>Homepage</h1>
      <Filter filter={productFetcher} maxValue={10000} minValue={1} />
      {pageInfo && (
        <Pagination
          currentPage={currentPage}
          totalPages={pageInfo!.totalPages!}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      <div className={classes.ProductRow}>
        {products &&
          products.map((product) => <ProductView product={product} />)}
      </div>
      <div className={classes.CategoryRow}>
        {categories.map((category) => (
          <CategoryView category={category} isShort={true} />
        ))}
      </div>
      <div className={classes.ProductRow}>
        {services &&
          //TODO: fix admin product filter
          services.map((service) => (
            <ServiceView service={service}></ServiceView>
          ))}
      </div>
      <div></div>
      <div className={classes.Center}>
        <Slider
          label="Price"
          minValue={0}
          maxValue={100}
          onBottomChange={(value) => console.log(value)}
          onTopChange={(value) => console.log(value)}
        ></Slider>
      </div>
    </div>
  );
};
