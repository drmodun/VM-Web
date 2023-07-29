import { Category, getCategories } from "../../../Api/CategoryApi";
import { Product, getProducts } from "../../../Api/ProductApi";
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
export const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");

  const productFetcher = async () => {
    const response = await getProducts({
      "Sorting.Attribute": SortAttributeType.SortByProfit,
      "Sorting.SortType": SortType.Descending,
    });
    setProducts(response?.items!);
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
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      <div className={classes.ProductRow}>
        {products.map((product) => (
          <ProductView product={product} />
        ))}
      </div>
      <div className={classes.CategoryRow}>
        {categories.map((category) => (
          <CategoryView category={category} isShort={true} />
        ))}
      </div>
      <div>
        <Register
          isEdit={false}
          onRegister={async (data) => {
            return true;
          }}
        />
      </div>
      <div>{products[0] && <MainProductView product={products[0]} />} </div>
      <div> {products[0] && <SimilarProducts prod={products[0]} />}</div>
      <div> {products[0]  && 
      <SpecificationView specs={products[0].attributes} subSpecs={products[0].subAttributes} />}
      </div>
    </div>
  );
};
