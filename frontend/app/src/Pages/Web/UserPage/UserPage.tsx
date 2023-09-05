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
import Switch from "../../../Components/Web/Switch";

const stripePromise = loadStripe(
  "pk_live_51NcS2vApp5avo5Y6WDlDezJYc31OwGdPJIDnuezXyIzAodhKpEp0xjixVfbOhUhS4zDFmMQxgIk6JCWUDw9Pnowl00fCXsTacc"
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
  const [hasCard, setHasCard] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [spent, setSpent] = useState<number>(0);
  const [sortType, setSortType] = useState<number>(0); //0 - none, 1 - abc, 2 - price, 3 - date
  const [criteria, setCriteria] = useState<number>(0); //0 - none, 1 - abc, 2 - price, 3 - date
  const [tab, setTab] = useState<Tabs>(Tabs.Info);
  const reload = async () => {
    const info = await getMe();
    if (!info) {
      window.location.href = "/";
      return;
    }
    console.log(info);
    setUser(info.user);
    setHasCard(info.hasCardInfo);
    setOrders(info.orders);
    setSpent(info.totalSpent);
    setTransactions(info.transactions);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    window.document.title = "User";
    reload();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    window.location.href = "/";
  };

  return user ? (
    <Elements stripe={stripePromise}>
      <div className={classes.Container}>
        <div className={classes.UserPage}>
          <div className={classes.User}>
            <div className={classes.Column}>
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
              </div>
              <button className={classes.Logout} onClick={logout}>
                Logout
              </button>
            </div>
            <div className={classes.Selection}>
              <div className={classes.Options}>
                <div
                  className={
                    classes.Option +
                    " " +
                    (tab === Tabs.Info ? classes.Active : "")
                  }
                  onClick={() => setTab(Tabs.Info)}
                >
                  <span>Info</span>
                </div>
                <div
                  onClick={() => setTab(Tabs.Payment)}
                  className={
                    classes.Option +
                    " " +
                    (tab === Tabs.Payment ? classes.Active : "")
                  }
                >
                  Plaćanje
                </div>
                <div
                  className={
                    classes.Option +
                    " " +
                    (tab === Tabs.Orders ? classes.Active : "")
                  }
                  onClick={() => setTab(Tabs.Orders)}
                >
                  <span>Narudžbe</span>
                </div>
                <div
                  className={
                    classes.Option +
                    " " +
                    (tab === Tabs.Transactions ? classes.Active : "")
                  }
                  onClick={() => setTab(Tabs.Transactions)}
                >
                  <span>Transakcije</span>
                </div>
                <Link
                  className={
                    classes.Option +
                    " " +
                    (tab === Tabs.Favourites ? classes.Active : "")
                  }
                  to={`/favourites`}
                  onClick={() => setTab(Tabs.Favourites)}
                >
                  <span>Favoriti</span>
                </Link>
                <Link
                  className={
                    classes.Option +
                    " " +
                    (tab === Tabs.Cart ? classes.Active : "")
                  }
                  to={`/cart`}
                  onClick={() => setTab(Tabs.Cart)}
                >
                  <span>Košarica</span>
                </Link>
              </div>
              <div className={classes.Content}>
                {tab === Tabs.Info && (
                  <div className={classes.Info}>
                    <EditableUserInfo user={user!} reload={reload} />
                  </div>
                )}
                {tab === Tabs.Payment && (
                  <div className={classes.Form}>
                    <h3>Payment</h3>
                    <span>
                      {hasCard
                        ? "Već imate spremljene podatke o kartici, možete ih promijeniti"
                        : "Nemate spremljene podatke o kartici, možete ih dodati"}
                    </span>
                    <CardSection />
                  </div>
                )}
                {tab === Tabs.Orders &&
                  (orders && orders.length > 0 ? (
                    <div className={classes.Orders}>
                      <div className={classes.SelectRow}>
                        <Switch
                          options={[
                            { label: "Nijedno", value: 0 },
                            { label: "Abecedno", value: 1 },
                            { label: "Cijena", value: 2 },
                            { label: "Datum", value: 3 },
                            { label: "Tip", value: 4 },
                            { label: "Status", value: 5 },
                          ]}
                          onSwitch={(value) => {
                            setCriteria(value);
                          }}
                        />
                        <Switch
                          options={[
                            { label: "Rastuće", value: 0 },
                            { label: "Padajuće", value: 1 },
                          ]}
                          onSwitch={(value) => {
                            setSortType(value);
                          }}
                        />
                      </div>
                      {orders
                        .sort((a, b) => {
                          if (criteria === 0) return 0;
                          if (criteria === 1) {
                            if (a.serviceName > b.serviceName) return 1;
                            else return -1;
                          }
                          if (criteria === 2) {
                            if (a.price > b.price) return 1;
                            else return -1;
                          }
                          if (criteria === 3) {
                            if (a.created > b.created) return 1;
                            else return -1;
                          }
                          if (criteria === 4) {
                            if (a.serviceType > b.serviceType) return 1;
                            else return -1;
                          }
                          if (criteria === 5) {
                            if (a.statusType > b.statusType) return 1;
                            else return -1;
                          }
                          return 0;
                        })
                        .sort((a, b) => {
                          if (sortType === 0) return 0;
                          return -1;
                        })
                        .map((order, index) => {
                          return <OrderView key={index} order={order} />;
                        })}
                    </div>
                  ) : (
                    <span className={classes.NotFound}>No orders found</span>
                  ))}
                {tab === Tabs.Transactions &&
                  (transactions && transactions.length > 0 ? (
                    <div className={classes.Transactions}>
                      <div className={classes.SelectRow}>
                        <Switch
                          options={[
                            { label: "Nijedno", value: 0 },
                            { label: "Abecedno", value: 1 },
                            { label: "Ukupna cijena", value: 2 },
                            { label: "Datum", value: 3 },
                          ]}
                          onSwitch={(value) => {
                            setCriteria(value);
                          }}
                        />
                        <Switch
                          options={[
                            { label: "Rastuće", value: 0 },
                            { label: "Padajuće", value: 1 },
                          ]}
                          onSwitch={(value) => {
                            setSortType(value);
                          }}
                        />
                      </div>
                      {transactions
                        .sort((a, b) => {
                          if (criteria === 0) return 0;
                          if (criteria === 1) {
                            if (a.productName > b.productName) return 1;
                            else return -1;
                          }
                          if (criteria === 2) {
                            if (
                              a.pricePerUnit * a.quantity >
                              b.quantity * b.pricePerUnit
                            )
                              return 1;
                            else return -1;
                          }
                          if (criteria === 3) {
                            if (a.createdAt > b.createdAt) return 1;
                            else return -1;
                          }
                          return 0;
                        })
                        .sort((a, b) => {
                          if (sortType === 0) return 0;
                          return -1;
                        })
                        .map((transaction, index) => {
                          return (
                            <TransactionView
                              key={index}
                              transaction={transaction}
                            />
                          );
                        })}
                    </div>
                  ) : (
                    <span className={classes.NotFound}>
                      No transactions found
                    </span>
                  ))}
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
