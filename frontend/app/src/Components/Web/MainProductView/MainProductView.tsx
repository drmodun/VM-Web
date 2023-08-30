import {
  Product,
  addToFavourites,
  removeFromFavourites,
} from "../../../Api/ProductApi";
import Placeholder from "../../../assets/placeholder.png";
import { Link } from "react-router-dom";
import classes from "./MainProductView.module.scss";
import { useEffect, useState } from "react";
import { addToCart, updateCart } from "../../../Api/UserApi";
import { accountInfo } from "../../../Api/Shared";

interface Props {
  product: Product;
}

//TODO: add image funcionality

export const MainProductView = ({ product }: Props) => {
  const [selectedQuantity, setSelectedQuantity] = useState(
    product?.cartQuantity || 1
  );
  const [isInCart, setIsInCart] = useState(product?.cartQuantity > 0 || false);
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
    const action = isInCart
      ? await updateCart(product.id, selectedQuantity)
      : await addToCart(product.id, selectedQuantity);
    if (!action) return;
    setIsInCart(true);
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Product}>
        <div className={classes.Image}>
          <img
            src={
              "https://media0testing.blob.core.windows.net/vm-racunala/products/" +
              product.id
            }
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = Placeholder;
            }}
          />
        </div>
        <div className={classes.ProductInfo}>
          <span className={classes.Title}>{product.name}</span>
          <div className={classes.Sub}>
            <div className={classes.Linked}>
              <span>Kategorija </span>
              <Link
                className={classes.SubLink}
                to={`/categories/${product.categoryId}`}
              >
                <span>{product.categoryName}</span>
              </Link>
            </div>
            <div className={classes.Linked}>
              <span>Subkategorija</span>
              <Link
                className={classes.SubLink}
                to={`/subcategories/${product.subcategoryId}`}
              >
                <span>{product.subcategoryName}</span>
              </Link>
            </div>
            <div className={classes.Linked}>
              <span>

              Brand
              </span>
              <Link
                className={classes.SubLink}
                to={`/brands/${product.companyId}`}
              >
                <span>{product.companyName}</span>
              </Link>
            </div>
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
              className={isInCart ? classes.Update : classes.Active}
              onClick={cartAdd}
            >
              {isInCart ? "Ažuriraj u košarici" : "Dodaj u košaricu"}
            </button>
            <button
              className={isFavourite ? classes.Inactive : classes.Active}
              onClick={toggleFavourite}
            >
              {isFavourite ? "Ukloni iz favorita" : "Dodaj u favorite"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
