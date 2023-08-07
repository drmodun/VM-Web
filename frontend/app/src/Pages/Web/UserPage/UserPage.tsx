import React, { useEffect, useState } from "react";
import { User, getMe } from "../../../Api/UserApi";
import classes from "./UserPage.module.scss";
import { Transaction } from "../../../Api/TransactionApi";
import { Order } from "../../../Api/OrderApi";
import { Link } from "react-router-dom";
import userPic from "../../../Assets/user.svg";
import EditableUserInfo from "../../../Components/Web/EditableUserInfo";
import OrderView from "../../../Components/Web/OrderView";
import TransactionView from "../../../Components/Web/TransactionView";

const enum Tabs {
  Info,
  Orders,
  Transactions,
  Favourites,
  Cart,
}

export const UserPage = () => {
  const [user, setUser] = useState<User>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tab, setTab] = useState<Tabs>(Tabs.Info);

  const reload = async () => {
    const info = await getMe();
    if (!info) return;
    setUser(info.user);
    setOrders(info.orders);
    setTransactions(info.transactions);
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <div className={classes.Contaier}>
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
            </div>
          </div>
          <div className={classes.Selection}>
            <div className={classes.Options}>
              <div className={classes.Option} onClick={() => setTab(Tabs.Info)}>
                <span>Info</span>
              </div>
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
          </div>
          <div className={classes.Content}>
            {tab === Tabs.Info && (
              <div className={classes.Info}>
                <EditableUserInfo user={user!} reload={reload} />
              </div>
            )}
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
                    <TransactionView key={index} transaction={transaction} />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
