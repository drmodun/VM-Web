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
//implement filter and sorting TODO
//TODO: test and fix this page
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

  //TODO: add filters and sorting

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
                Type: order.statusType,
                Deadline : order.deadline ? `${order.deadline?.getDate()}/${order.deadline?.getMonth()+1}/${order.deadline?.getFullYear()}` : "No deadline",
            };
          })}
          links={[
            { name: "Service", link: "productId", type: "products"},
            { name: "User", link: "userId", type: "users"},
          ]}
          important={["Product", "User", "Type", "Deadline"]}
          deleteItem={handleDeleteOrder} //TODO
          type="orders"
        />
        <div className={classes.OrderPagePagination}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <p>{pageInfo}</p>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className={classes.PageActions}>
        <div className={classes.OrderPageSearch}>
          <Search.OrderSearch search={orderSearch}/>
        </div>
        <div className={classes.OrderPageCreate}>
          <h2>Create Order</h2>
          {//TODO: add create form
          }
          <span>Only users can make orders</span>
          
        </div>
      </div>
    </div>
  );
};
