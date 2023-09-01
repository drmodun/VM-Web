import { useParams } from "react-router-dom";
import classes from "./ProductPage.module.scss";
import { useState, useEffect } from "react";
import { Product, getProduct } from "../../../Api/ProductApi";
import MainProductView from "../../../Components/Web/MainProductView";
import SpecificationView from "../../../Components/Web/SpecificationView";
import SimilarProducts from "../../../Components/Web/SimilarProducts";
export const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const fetchProduct = async () => {
    const response = await getProduct(productId as string);
    if (response == null) {
      window.location.href = "/#/404";
      return;
    };
    console.log(response);
    setProduct(response);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <div className={classes.Container}>
      {product && (
        <>
          <MainProductView product={product} />
          <SpecificationView
            specs={product.attributes}
            subSpecs={product.subAttributes}
          />
          <SimilarProducts prod={product} />
        </>
      )}
      
    </div>
  );
};
