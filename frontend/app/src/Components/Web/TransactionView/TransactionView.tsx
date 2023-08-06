import classes from "TransactionView.module.scss";
import { Transaction } from "../../../Api/TransactionApi";
import { Link } from "react-router-dom";

interface Props {
  transaction: Transaction;
}

export const TransactionView = ({ transaction }: Props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Transaction}>
        <div className={classes.Info}>
          <Link
            to={`/products/${transaction.productId}`}
            className={classes.Name}
          >
            {transaction.productId}
          </Link>
          <div className={classes.Price}>
            <span>{transaction.pricePerUnit} €</span>
          </div>
          <div className={classes.Quantity}>
            <span>x{transaction.quantity}</span>
          </div>
        </div>
        <div className={classes.Total}>
          <span>
            {Math.round(transaction.pricePerUnit * transaction.quantity * 100) /
              100}{" "}
            €
          </span>
        </div>
      </div>
    </div>
  );
};
