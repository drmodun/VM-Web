import { Link } from "react-router-dom";
import { Order } from "../../../Api/OrderApi";
import classes from "./OrderView.module.scss";
interface Props {
  order: Order;
}

export const TypeDict: { [key: string]: string } = {
  "0": "Computer",
  "1": "Network",
  "2": "Device",
  "3": "Other",
};

export const StatusDict: { [key: string]: string } = {
  "0": "Pending",
  "1": "Accepted",
  "2": "Declined",
  "3": "In progress",
  "4": "Completed",
  "5": "Failed",
};

export const OrderView = ({ order }: Props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Order}>
        <div className={classes.Info}>
          <span className={classes.Date}>
            {new Date(order.craeted).toLocaleDateString()}
          </span>
          <Link to={`/services`} className={classes.Name}>
            ¸{order.serviceId}
          </Link>
          <div className={classes.Price}>
            <span>{order.price} €</span>
          </div>
          <div className={classes.Type}>
            <span>x{order.serviceType}</span>
          </div>
        </div>
        <div className={classes.Status}>
          <span>{order.statusType}</span>
        </div>
      </div>
    </div>
  );
};
