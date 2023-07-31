import { Product } from "../../../Api/ProductApi";
import Placeholder from "../../../assets/placeholder.png";
import { Link } from "react-router-dom";
import classes from "./MainProductView.module.scss";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
}

//TODO: add image funcionality

export const MainProductView = ({ product }: Props) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    setSelectedQuantity(1);
  }, [product]);

  return (
    <div className={classes.Container}>
      <div className={classes.Product}>
        <div className={classes.Image}>
          <img src={Placeholder} alt={product.name} />
        </div>
        <div className={classes.ProductInfo}>
          <span className={classes.Title}>{product.name}</span>
          <div className={classes.Sub}>
            <Link
              className={classes.SubLink}
              to={`/categories/${product.categoryId}`}
            >
              <span>{product.categoryName}</span>
            </Link>
            <Link
              className={classes.SubLink}
              to={`/categories/${product.categoryId}/subcategories/${product.subcategoryId}`}
            >
              <span>{product.subcategoryName}</span>
            </Link>

            <Link
              className={classes.SubLink}
              to={`/brands/${product.companyId}`}
            >
              <span>{product.companyName}</span>
            </Link>
          </div>
          <span className={classes.Description}>{product.description}</span>
          <span className={classes.Quantity}>{product.quantity} komada</span>
          <span className={classes.Price}>{product.price} €</span>
          <div className={classes.QuantitySelector}>
            <button
              className={classes.Button}
              onClick={() =>
                setSelectedQuantity(
                  selectedQuantity === 1 ? 1 : selectedQuantity - 1
                )
              }
            >
              -
            </button>
            <span className={classes.SelectedQuantity}>{selectedQuantity}</span>
            <button
              className={classes.Button}
              onClick={() =>
                setSelectedQuantity(
                  selectedQuantity === product.quantity
                    ? product.quantity
                    : selectedQuantity + 1
                )
              }
            >
              +
            </button>
          </div>
          <div className={classes.Buttons}>
            <button className={classes.AddToCart}>Dodaj u košaricu</button>
            <button className={classes.AddToFavourites}>
              Dodaj u favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
