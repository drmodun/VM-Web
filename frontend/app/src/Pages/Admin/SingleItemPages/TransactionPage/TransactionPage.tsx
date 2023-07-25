import { Transaction, getTransaction } from "../../../../Api/TransactionApi";
import ItemView from "../../../../Components/Admin/ItemView";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import classes from "../SingleItemPage.module.scss";

const transactionTypeDict: { [key: string]: string } = {
  0: "Cash",
  1: "Credit Card",
  2: "Debit Card",
  3: "Paypal",
};

export const TransactionPage = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const tryGetTransaction = async () => {
    const tryTransaction = await getTransaction(transactionId as string);
    if (tryTransaction) {
      setTransaction(tryTransaction);
    }
  };
  useEffect(() => {
    tryGetTransaction();

    // fetch transaction data
    //TODO: add keys later
    //add edit functionality later
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
                Created: `${transaction.createdAt.getDate()}/${
                  transaction.createdAt.getMonth() + 1
                }/${transaction.createdAt.getFullYear()}`,
                Type: transactionTypeDict[transaction.transactionType],
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
          <button className={classes.DeleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};
