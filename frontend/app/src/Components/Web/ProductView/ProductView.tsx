import {
  Product,
  ShortProduct,
  addToFavourites,
  removeFromFavourites,
} from "../../../Api/ProductApi";
import classes from "./ProductView.module.scss";
import Favourite from "../../../assets/favorite_product.svg";
import Cart from "../../../assets/cart.svg";
import image from "../../../assets/placeholder.png";
import favourite_active from "../../../assets/favorite_product_active.svg";
import shopping_active from "../../../assets/shopping_product_active.svg";
import shopping from "../../../assets/shopping_product_hover.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { accountInfo } from "../../../Api/Shared";
import { addToCart, removeFromCart } from "../../../Api/UserApi";
interface Props {
  product: ShortProduct;
  removal?: Function;
}

//TODO: add image funcionality
//TODO: add favourite functionality
//see if cart works

export const ProductView = ({ product, removal }: Props) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(product.isFavourite);
  const [isInCart, setIsInCart] = useState(product.isInCart);

  const toggleFavourite = async () => {
    if (accountInfo)
      isFavourite
        ? (await removeFromFavourites(product.id)) && removal && removal()
        : await addToFavourites(product.id);
    setIsFavourite((prev) => !prev);
  };

  const toggleInCart = async () => {
    if (accountInfo)
      isInCart
        ? await removeFromCart(product.id)
        : await addToCart(product.id, 1);
    setIsInCart((prev) => !prev);
  };

  useEffect(() => {
    setIsFavourite(product.isFavourite);
    setIsInCart(product.isInCart);
  }, [product]);

  useEffect(() => {
    setIsFavourite(product.isFavourite);
    setIsInCart(product.isInCart);
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.Product}>
        <div className={classes.Favourite} onClick={toggleFavourite}>
          <img
            className={
              isFavourite ? classes.FavouriteActive : classes.FavouriteInactive
            }
            src={isFavourite ? favourite_active : Favourite}
            alt="favourite"
          />
        </div>
        <div className={classes.Image}>
          <img
            src={
              "https://media0testing.blob.core.windows.net/vm-racunala/products/" +
              product.id
            }
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = image;
            }}
          />
        </div>
        <div className={classes.ProductInfo}>
          <Link
            //TODO: decide the links for the product
            to={`/products/${product.id}`}
            className={classes.Name}
          >
            <span>{product.name}</span>
          </Link>
          <div className={classes.Sub}>
            <Link
              className={classes.SubLink}
              to={`/categories/${product.categoryId}`}
            >
              {product.categoryName}
            </Link>
            <Link
              className={classes.SubLink}
              to={`/categories/${product.categoryId}/subcategories/${product.subcategoryId}`}
            >
              {product.subcategoryName}
            </Link>
            <Link
              className={classes.SubLink}
              to={`/brands/${product.companyId}`}
            >
              {product.companyName}
            </Link>
          </div>
          <div className={classes.Price}>
            <span>{product.price} €</span>
          </div>

          <div className={classes.BottomRow}>
            <Link className={classes.Button} to={`/products/${product.id}`}>
              <span>Pogledaj</span>
            </Link>

            <button
              className={isInCart ? classes.CartActive : classes.Cart}
              onClick={toggleInCart}
            >
              <img src={isInCart ? shopping_active : shopping} alt="cart" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
