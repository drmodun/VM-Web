import React, { useEffect, useState } from "react";
import { User, getMe } from "../../../Api/UserApi";
import classes from "./UserPage.module.scss";
import { Transaction } from "../../../Api/TransactionApi";
import { Order } from "../../../Api/OrderApi";
import { Link } from "react-router-dom";
import userPic from "../../../assets/user.svg";
import EditableUserInfo from "../../../Components/Web/EditableUserInfo";
import OrderView from "../../../Components/Web/OrderView";
import TransactionView from "../../../Components/Web/TransactionView";
import StripeCheckout from "react-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardSection from "../../../Components/Web/CardSection/CardSection";

const stripePromise = loadStripe(
  "pk_test_51NcS2vApp5avo5Y6EQBAPyzC9QJBqsb4fB8paxKr2fF5OfmvAiReZhv9vxaoryAGSwwj5r15dRrVhtR53nr8qqSt00V94ZU7zX"
);

const enum Tabs {
  Info,
  Orders,
  Transactions,
  Payment,
  Favourites,
  Cart,
}

export const UserPage = () => {
  const [user, setUser] = useState<User>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [spent, setSpent] = useState<number>(0);
  const [tab, setTab] = useState<Tabs>(Tabs.Info);

  const reload = async () => {
    const info = await getMe();
    if (!info) return;
    setUser(info.user);
    setOrders(info.orders);
    setSpent(info.totalSpent);
    setTransactions(info.transactions);
    window.scrollTo(0, 0);
  };
  //later make sorting for transactions and orders
  useEffect(() => {
    window.document.title = "User";
    reload();
  }, []);

  return user ? (
    <Elements stripe={stripePromise}>
      <div className={classes.Container}>
        <div className={classes.UserPage}>
          <div className={classes.User}>
            <div className={classes.Info}>
              <div className={classes.Image}>
                <img src={userPic} alt={user?.name} />
              </div>
              <div className={classes.Name}>
                <span>{user?.name}</span>
              </div>
              <div className={classes.Email}>
                <span>{user?.email}</span>
              </div>
              <div className={classes.Stats}>
                <div className={classes.Stat}>
                  <span>Orders: </span>
                  <span>{orders.length}</span>
                </div>
                <div className={classes.Stat}>
                  <span>Transactions: </span>
                  <span>{transactions.length}</span>
                </div>
                <div className={classes.Stat}>
                  <span>Total Spent: </span>
                  <span>{spent}€</span>
                </div>
              </div>
              <StripeCheckout
                stripeKey="pk_test_51NcS2vApp5avo5Y6EQBAPyzC9QJBqsb4fB8paxKr2fF5OfmvAiReZhv9vxaoryAGSwwj5r15dRrVhtR53nr8qqSt00V94ZU7zX"
                token={(token) => console.log(token)}
                name="Card"
                currency="EUR"
                email=""
                label="Add card info"
                ComponentClass={classes.StripeButton}
                shippingAddress
                billingAddress
                description="Cart Payment"
                //add new version of stripe checkout
              />
            </div>
            <div className={classes.Selection}>
              <div className={classes.Options}>
                <div
                  className={classes.Option}
                  onClick={() => setTab(Tabs.Info)}
                >
                  <span>Info</span>
                </div>
                <div
                  onClick={() => setTab(Tabs.Payment)}
                  className={classes.Option}
                >Payment</div>
                <div
                  className={classes.Option}
                  onClick={() => setTab(Tabs.Orders)}
                >
                  <span>Orders</span>
                </div>
                <div
                  className={classes.Option}
                  onClick={() => setTab(Tabs.Transactions)}
                >
                  <span>Transactions</span>
                </div>
                <Link
                  className={classes.Option}
                  to={`/favourites`}
                  onClick={() => setTab(Tabs.Favourites)}
                >
                  <span>Favourites</span>
                </Link>
                <Link
                  className={classes.Option}
                  to={`/cart`}
                  onClick={() => setTab(Tabs.Cart)}
                >
                  <span>Cart</span>
                </Link>
              </div>
              <div className={classes.Content}>
                {tab === Tabs.Info && (
                  <div className={classes.Info}>
                    <EditableUserInfo user={user!} reload={reload} />
                  </div>
                )}
                {
                  tab === Tabs.Payment && (
                    <div className={classes.Form} onSubmit={(e)=>console.log(e)}>
                      <CardSection/>
                    </div>
                  )
                }
                {tab === Tabs.Orders && (
                  <div className={classes.Orders}>
                    {orders.map((order, index) => {
                      return <OrderView key={index} order={order} />;
                    })}
                  </div>
                )}
                {tab === Tabs.Transactions && (
                  <div className={classes.Transactions}>
                    {transactions.map((transaction, index) => {
                      return (
                        <TransactionView
                          key={index}
                          transaction={transaction}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  ) : (
    <h1>Error</h1>
  );
};
