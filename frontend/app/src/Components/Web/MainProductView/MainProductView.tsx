import { Product } from "../../../Api/ProductApi";
import Placeholder from "../../../assets/placeholder.png";
import { Link } from "react-router-dom";
import classes from "./MainProductView.module.scss";
import { useEffect, useState } from "react";
import { addToCart } from "../../../Api/UserApi";

interface Props {
  product: Product;
}

//TODO: add image funcionality

export const MainProductView = ({ product }: Props) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  // const [isInCart, setIsInCart] = useState(product.isInCart);
  // const [isFavourite, setIsFavourite] = useState(product.isFavourite);
  //make product view itself more modular and have isFavourites and isInCart as props
    useEffect(() => {
    setSelectedQuantity(1);
  }, [product]);

  const toggleFavourite = async () => {
    // if (accountInfo)
    //   isFavourite
    //     ? (await removeFromFavourites(product.id)) && removal && removal()
    //     : await addToFavourites(product.id);
    // setIsFavourite((prev) => !prev);
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
            <button className={classes.AddToCart} onClick={cartAdd}>
              Dodaj u košaricu
            </button>
            <button className={classes.AddToFavourites}>
              Dodaj u favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
