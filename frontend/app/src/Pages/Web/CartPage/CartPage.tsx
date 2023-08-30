import { useState, useEffect } from "react";
import classes from "./CartPage.module.scss";
import { CartItem, Checkout, getCart } from "../../../Api/UserApi";
import CartItemView from "../../../Components/Web/CartItemView";
import { accountInfo } from "../../../Api/Shared";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  const checkout = async () => {
    setDisabled(true);
    const action = await Checkout();
    if (!action) return;
    //go to the page for transactions
    window.location.href = "/";
  };

  const removeTotal = (value: number, index: number) => {
    setTotal((prev) => Math.round((prev - value) * 100) / 100);
    setCartItems((prev) => {
      prev.splice(index, 1);
      return prev;
    });
  };

  const changeTotal = (value: number, index: number) => {
    console.log(value);
    console.log(Math.round((cartItems[index].total + value) * 100) / 100);
    setTotal((prev) => Math.round((prev + value) * 100) / 100);
  };

  const fetchCart = async () => {
    if (!accountInfo) return;
    const response = await getCart();
    setCartItems(response?.items!);
    setTotal(response?.totalPrice!);
  };
  useEffect(() => {
    fetchCart();
  }, []);

  //make things for empty cart

  return accountInfo ? (
    <div className={classes.Container}>
      <div className={classes.Cart}>
        {cartItems.length > 0 ? (
          <div className={classes.CartItems}>
            {cartItems &&
              cartItems.map((item, i) => (
                <CartItemView
                  item={item}
                  remove={removeTotal}
                  index={i}
                  change={changeTotal}
                />
              ))}
          </div>
        ) : (
          <div className={classes.Empty}>
            <h1>Your cart is empty</h1>
            <p>
              Go to the <a href="/">home page</a> or{" "}
              <a href="/products">the product page</a>to add items to your cart
            </p>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className={classes.Checkout}>
            <div className={classes.Total}>
              <span>Total:</span>
              <span className={classes.Price}>{total} €</span>
            </div>
            <button
              className={classes.Button}
              disabled={disabled}
              onClick={checkout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className={classes.Container}>
      <div className={classes.Cart}>
        <div className={classes.Empty}>
          <h1>You are not logged in</h1>
          <p>
            You need to be logged in to see your cart and add items to your
            cart. Go to the <a href="/login">login page</a> or{" "}
            <a href="/register">the register page</a> to log in or register
          </p>
        </div>
      </div>
    </div>
  );
};
