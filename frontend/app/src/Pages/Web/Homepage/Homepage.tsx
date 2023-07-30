import { Category, getCategories } from "../../../Api/CategoryApi";
import { Product, ShortProduct, getProducts, getShortProducts } from "../../../Api/ProductApi";
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
export const Homepage = () => {
  const [products, setProducts] = useState<ShortProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>();
  const [name, setName] = useState("");

  const productFetcher = async () => {
    const response = await getShortProducts({
      "Sorting.Attribute": SortAttributeType.SortByProfit,
      "Sorting.SortType": SortType.Descending,
    });
    setProducts(response?.items!);
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

  return (
    <div>
      <h1>Homepage</h1>
      <div className={classes.ProductRow}>
        {products && products.map((product) => (
          <ProductView product={product} />
        ))}
      </div>
      <div className={classes.CategoryRow}>
        {categories.map((category) => (
          <CategoryView category={category} isShort={true} />
        ))}
      </div>
      <div className={classes.ProductRow}>
        {services && services.map((service)=>(<ServiceView service={service}></ServiceView>))}
      </div>
    </div>
  );
};
