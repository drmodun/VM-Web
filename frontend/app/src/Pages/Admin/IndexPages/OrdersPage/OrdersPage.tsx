import { useEffect, useState } from "react";
import classes from "../IndexPage.module.scss";
import {
  GetAllProps,
  Order,
  deleteOrder,
  getOrder,
  getOrders,
} from "../../../../Api/OrderApi";
import ItemTable from "../../../../Components/Admin/ItemTable";
import { Link } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import Search from "../../../../Components/Admin/SearchSettings";
import { getCategories } from "../../../../Api/CategoryApi";
import { Category } from "../../../../Types/Interfaces";
const orderTypeDict: { [key: string]: string } = {
  0: "Pending",
  1: "Accepted",
  2: "Rejected",
  3: "In progress",
  4: "Completed",
  5: "Failed",
};
export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const orderGetter = async () => {
    setStatus("Loading...");
    const orders = await getOrders();
    console.log(orders);
    if (orders?.items) {
      setOrders(orders.items);
      setTotalPages(orders.pageInfo.totalPages || 1);
      setTotalItems(orders.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${orders.pageInfo.page} of ${orders.pageInfo.totalPages!}`
      );
      setStatus("Orders fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  const orderSearch = async (parameters: GetAllProps) => {
    setStatus("Loading...");
    const orders = await getOrders(parameters);
    if (orders?.items) {
      setOrders(orders.items);
      console.log(orders);
      setTotalPages(orders.pageInfo.totalPages || 1);
      setTotalItems(orders.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${orders.pageInfo.page} of ${orders.pageInfo.totalPages!}`
      );
      setStatus("Orders fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  useEffect(() => {
    orderGetter();
  }, []);

  const handleDeleteOrder = async (id: string) => {
    const result = await deleteOrder(id);
    if (result) {
      setOrders(orders.filter((category) => category.id !== id));
      setStatus("Order deleted successfully");
    } else {
      setStatus("Something went wrong");
    }
  };


  return (
    <div className={classes.Page}>
      <h1>Orders</h1>
      <p>The page where you can edit, view, delete and create orders</p>
      <div className={classes.PageContainer}>
        <ItemTable
          items={orders.map((order) => {
            return {
              id: order.id,
              Service: order.serviceName,
              User: order.userName,
              serviceId: order.serviceId,
              userId: order.userId,
              Type: orderTypeDict[order.statusType],
              Deadline: order.deadline
                ? `${new Date(order.deadline).getDate()}/${
                  new Date(order.deadline).getMonth() + 1
                  }/${new Date(order.deadline).getFullYear()}`
                : "No deadline",
            };
          })}
          links={[
            { name: "Service", link: "serviceId", type: "services" },
            { name: "User", link: "userId", type: "users" },
          ]}
          important={["Service", "User", "Type", "Deadline"]}
          deleteItem={handleDeleteOrder} 
          type="orders"
        />
        <div className={classes.OrderPagePagination}>
          
        </div>
      </div>
      <div className={classes.PageActions}>
        <div className={classes.OrderPageSearch}>
          <Search.OrderSearch search={orderSearch} />
        </div>
        <div className={classes.OrderPageCreate}>
          <span>Only users can make orders</span>
        </div>
      </div>
    </div>
  );
};
