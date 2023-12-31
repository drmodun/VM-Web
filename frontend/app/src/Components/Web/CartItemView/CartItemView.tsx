import { Link } from "react-router-dom";
import { CartItem, removeFromCart, updateCart } from "../../../Api/UserApi";
import Placeholder from "../../../assets/placeholder.webp";
import classes from "./CartItemView.module.scss";
import { useEffect, useState } from "react";
interface Props {
  item: CartItem;
  change?: Function;
  remove?: Function;
  index?: number;
}
export const CartItemView = ({ item, change, remove, index }: Props) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [total, setTotal] = useState(item.total);
  const [disabled, setDisabled] = useState(false);

  const changeQuantity = async (value: number) => {
    setDisabled(true);
    //TODO: further testing
    if (value < 1 || value > item.maxQuantity) return;
    var action: boolean = await updateCart(item.productId, value);
    if (!action) return;
    setQuantity(value);
    const price =
      Math.round((value * item.pricePerUnit + Number.EPSILON) * 100) / 100;
    change && change(price - total, index);
    setTotal(price);
    setDisabled(false);
  };

  const removeItem = async () => {
    var action: boolean = await removeFromCart(item.productId);
    if (!action) return;
    change && remove && remove(total, index);
    setQuantity(0);
    setTotal(0);
  };

  //   useEffect(() => {
  //     changeQuantity(item.quantity);
  //     console.log(item);
  //   }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.Item}>
        <div className={classes.Image}>
          <img
            src={
              "https://media0testing.blob.core.windows.net/vm-racunala/products/" +
              item.productId
            }
            onError={(e) => {
              e.currentTarget.src = Placeholder;
            }}
            alt="product"
          />
        </div>
        <div className={classes.Info}>
          <Link className={classes.Name} to={`/products/${item.productId}`}>
            {item.productName}
          </Link>
          <div className={classes.Price}>
            <span>Price: {item.pricePerUnit} €</span>
          </div>
          <div className={classes.Bottom}>
            <Link
              className={classes.Link}
              to={`/categories/${item.categoryId}`}
            >
              {item.categoryName}
            </Link>
            <Link
              className={classes.Link}
              to={`/subcategories/${item.subcategoryId}`}
            >
              {item.subcategoryName}
            </Link>

            <Link className={classes.Link} to={`/brands/${item.brandId}`}>
              {item.brandName}
            </Link>
          </div>
        </div>
        <div className={classes.Control}>
          <div className={classes.Total}>
            <span>Total: {total} €</span>
          </div>
          <div className={classes.Quantity}>
            <button
              disabled={quantity === 1 || disabled}
              onClick={() => {
                changeQuantity(quantity - 1);
              }}
            >
              -
            </button>
            <div>{quantity}</div>
            <button
              disabled={quantity === item.maxQuantity || disabled}
              onClick={() => {
                changeQuantity(quantity + 1);
              }}
            >
              +
            </button>
          </div>
          <button className={classes.Remove} onClick={removeItem}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
