import {
  Product,
  addToFavourites,
  removeFromFavourites,
} from "../../../Api/ProductApi";
import Placeholder from "../../../assets/placeholder.png";
import { Link } from "react-router-dom";
import classes from "./MainProductView.module.scss";
import { useEffect, useState } from "react";
import { addToCart } from "../../../Api/UserApi";
import { accountInfo } from "../../../Api/Shared";

interface Props {
  product: Product;
}

//TODO: add image funcionality

export const MainProductView = ({ product }: Props) => {
  const [selectedQuantity, setSelectedQuantity] = useState(
    product?.cartQuantity || 1
  );
  const [isFavourite, setIsFavourite] = useState(product?.isFavourite || false);

  useEffect(() => {
    setSelectedQuantity(product?.cartQuantity || 1);
    setIsFavourite(product?.isFavourite || false);
  }, [product]);

  const toggleFavourite = async () => {
    if (accountInfo) {
      isFavourite
        ? removeFromFavourites(product.id)
        : addToFavourites(product.id);
      isFavourite ? setIsFavourite(false) : setIsFavourite(true);
      return;
    }
    alert(
      "Morate biti prijavljeni da biste dodali proizvod u favorite, prijavite se ili registrirajte"
    );
  };

  const cartAdd = async () => {
    const action = await addToCart(product.id, selectedQuantity);
    if (!action) return;
  };

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
            <button
              className={
                product.cartQuantity > 0 ? classes.Update : classes.Active
              }
              onClick={cartAdd}
            >
              {
                product.cartQuantity > 0 ? "Ažuriraj u košarici" : "Dodaj u košaricu"
              }
            </button>
            <button
              className={isFavourite ? classes.Inactive : classes.Active}
              onClick={toggleFavourite}
            >
              {
                isFavourite ? "Ukloni iz favorita" : "Dodaj u favorite"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
