import { Order, deleteOrder, getOrder } from "../../../../Api/OrderApi";
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
    console.log(tryOrder);
  };
  useEffect(() => {
    tryGetOrder();
    console.log(order);

    // fetch order data
    //TODO: add keys later
    //add edit functionality later
  }, []);

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmation) return;
    const tryAction = await deleteOrder(orderId as string);
    if (!tryAction) return;
    alert("Order successfully deleted");
    window.location.href = "/admin/orders";
  };
  
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
                  ? `${new Date(order.deadline).getDate()}/${
                    new Date(order.deadline).getMonth() + 1
                  }/${new Date(order.deadline).getFullYear()}`
                  : "No deadline",
                  Type: orderTypeDict[order.statusType],
                }}
                links={[
                  {
                    name: "Service",
                    link: `/admin/services/${order.serviceId}`,
                  },
                  { name: "User", link: `/admin/user/${order.userId}` },
                ]}
                />
          </div>
        )}
        <div className={classes.EditAndDelete}>
          {order && <Forms.ChangeOrderForm
            isEdit={true}
            item={order!}
            reload={tryGetOrder}
          />}
          <button onClick={handleDelete} className={classes.DeleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};
