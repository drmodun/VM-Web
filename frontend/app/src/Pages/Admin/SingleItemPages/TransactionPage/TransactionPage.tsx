import {
  Transaction,
  deleteTransaction,
  getTransaction,
} from "../../../../Api/TransactionApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "../SingleItemPage.module.scss";

export const TransactionPage = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const tryGetTransaction = async () => {
    const tryTransaction = await getTransaction(transactionId as string);
    if (tryTransaction) {
      setTransaction(tryTransaction);
    }
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmation) return;
    const tryAction = await deleteTransaction(transactionId as string);
    if (!tryAction) return;
    alert("User successfully deleted");
    window.location.href = "/admin/transactions";
  };
  useEffect(() => {
    tryGetTransaction();

    // fetch transaction data
  }, []);

  return (
    <div className={classes.Container}>
      <div className={classes.SingleItemPage}>
        {transaction && (
          <div className={classes.ItemInfo}>
            <span>Transaction Info:</span>
            <ItemView
              item={{
                Id: transaction.id,
                Product: transaction.productName,
                User: transaction.userName,
                Quantity: transaction.quantity,
                Price: transaction.pricePerUnit,
                Total:
                  Math.round(
                    transaction.pricePerUnit * transaction.quantity * 100
                  ) / 100,
                Created: `${new Date(
                  transaction.createdAt
                ).toLocaleDateString()} ${new Date(
                  transaction.createdAt
                ).toLocaleTimeString()}`,
              }}
              links={[
                {
                  name: "Product",
                  link: `/admin/product/${transaction.productId}`,
                },
                { name: "User", link: `/admin/user/${transaction.userId}` },
              ]}
            />
          </div>
        )}
        <div className={classes.EditAndDelete}>
          <span>Edit and delete</span>
          <span>You cannot edit user transactions</span>
          <button onClick={handleDelete} className={classes.DeleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
