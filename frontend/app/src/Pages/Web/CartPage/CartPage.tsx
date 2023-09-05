import { useState, useEffect } from "react";
import classes from "./CartPage.module.scss";
import { CartItem, Checkout, User, getCart, getMe } from "../../../Api/UserApi";
import CartItemView from "../../../Components/Web/CartItemView";
import { accountInfo } from "../../../Api/Shared";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [hasCard, setHasCard] = useState<boolean>(false);
  const checkout = async () => {
    setDisabled(true);
    const action = await Checkout();
    if (!action) {
      setDisabled(false);
      alert("Something went wrong, please try again later");
      return;
    }
    alert(
      "Successfully checked out your cart, see your transactions on your user page"
    );
    //go to the page for transactions
    window.location.href = "/#/user";
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
    const tempUser = await getMe();
    if (response == null || tempUser == null) return;
    setHasCard(tempUser.hasCardInfo);
    setCartItems(response?.items!);
    setTotal(response?.totalPrice!);
  };
  useEffect(() => {
    window.document.title = "Cart";
    window.scrollTo(0, 0);
    fetchCart();
  }, []);

  //make things for empty cart

  return accountInfo ? (
    <div className={classes.Container}>
      <div className={classes.Cart}>
        {cartItems && cartItems.length > 0 ? (
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
            <h1>Vaša košarica je prazna, dodajte proizvode na </h1>
            <p>
              Go to the <a href="/">home page</a> or{" "}
              <a href="/#/products">the product page</a> to add items to your
              cart
            </p>
          </div>
        )}
        {cartItems && cartItems.length > 0 && (
          <div className={classes.Checkout}>
            <div className={classes.Total}>
              <span>Total:</span>
              <span className={classes.Price}>{total} €</span>
            </div>
            <button
              className={classes.Button}
              disabled={disabled || !hasCard}
              onClick={checkout}
            >
              Checkout
            </button>
            {!hasCard && (
              <p className={classes.Warning}>
                Morate biti prijavljeni i imati spremljenu karticu da biste
                mogli izvršiti kupnju
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className={classes.Container}>
      <div className={classes.Cart}>
        <div className={classes.Empty}>
          <h1>Morate biti prijavljeni</h1>
          <p>
            Morate biti prijavljeni da biste mogli vidjeti svoju košaricu.
            Otiđite na <a href="/#/login">strnaicu prijave</a> ili{" "}
            <a href="/#/register">stranicu za stvaranje računa</a> da biste se
            prijavili ili stvorili račun
          </p>
        </div>
      </div>
    </div>
  );
};
