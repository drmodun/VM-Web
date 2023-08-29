import {
  Product,
  SimilarProduct,
  SimilarProps,
  getSimilar,
} from "../../../Api/ProductApi";
import { useState, useEffect } from "react";
import Placeholder from "../../../assets/placeholder.png";
import classes from "./SimilarProducts.module.scss";
import { Link } from "react-router-dom";

interface Props {
  prod: Product;
}

export const SimilarProducts = ({ prod }: Props) => {
  const [products, setProducts] = useState<SimilarProduct[]>([]);
  const [error, setError] = useState<string>("");
  const fetchSimilarProducts = async () => {
    const props: SimilarProps = {
      price: prod.price,
      id: prod.id,
      subcategoryId: prod.subcategoryId,
    };
    const response = await getSimilar(props);
    if (response == null) {
      setError("Error");
      return;
    }
    setProducts(response?.items);
  };

  useEffect(() => {
    fetchSimilarProducts();
  }, []);

  useEffect(() => {
    fetchSimilarProducts();
  }, [prod]);

  return (
    <div className={classes.Container}>
      <h2>Similar Products</h2>
      <div className={classes.SimilarProducts}>
        {products.map((product) => (
          <>
            <div className={classes.Divider}></div>
            <div className={classes.SimilarProduct}>
              <div className={classes.Main}>
                <img
                  src={
                    "https://media0testing.blob.core.windows.net/vm-racunala/products/" +
                    product.id
                  }
                  onError={(e) => {
                    e.currentTarget.src = Placeholder;
                  }}
                  alt={product.name}
                />
                <Link className={classes.Link} to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
              </div>
              <div className={classes.SimilarProductDetails}>
                <span className={classes.Price}>{product.price} €</span>
                <Link
                  className={classes.Link}
                  to={`/brands/${product.companyId}`}
                >
                  <span className={classes.Company}>{product.companyName}</span>
                </Link>
              </div>
              <div className={classes.Bottom}>
                <span
                  className={
                    product.isInStock ? classes.InStock : classes.OutOfStock
                  }
                >
                  {product.isInStock ? "U ponudi" : "Rasprodano"}
                </span>
                <Link className={classes.Link} to={`/products/${product.id}`}>
                  <button>Pogledaj</button>
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
