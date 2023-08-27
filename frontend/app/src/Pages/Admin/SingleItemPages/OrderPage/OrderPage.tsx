import { Order, getOrder } from "../../../../Api/OrderApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "../SingleItemPage.module.scss";
//TODO: later add types
const orderTypeDict: { [key: string]: string } = {
  0: "Pending",
  1: "Accepted",
  2: "Rejected",
  3: "In progress",
  4: "Completed",
  5: "Failed",
};

export const OrderPageAdmin = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  const tryGetOrder = async () => {
    const tryOrder = await getOrder(orderId as string);
    if (tryOrder) {
      setOrder(tryOrder);
    }
  };
  useEffect(() => {
    tryGetOrder();

    // fetch order data
    //TODO: add keys later
    //add edit functionality later
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.SingleItemPage}>
        {order && (
          <div className={classes.ItemInfo}>
            <span>Order Info:</span>
            <ItemView
              item={{
                Id: order.id,
                Service: order.serviceName,
                User: order.userName,
                Deadline: order.deadline
                  ? `${order.deadline.getDate()}/${
                      order.deadline.getMonth() + 1
                    }/${order.deadline.getFullYear()}`
                  : "No deadline",
                Type: orderTypeDict[order.statusType],
              }}
              links={[
                {
                  name: "Product",
                  link: `/admin/product/${order.serviceId}`,
                },
                { name: "User", link: `/admin/user/${order.userId}` },
              ]}
            />
          </div>
        )}
        <div className={classes.EditAndDelete}>
          <span>Edit and delete</span>
          <span>You cannot edit user orders</span>
          <button className={classes.DeleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};
