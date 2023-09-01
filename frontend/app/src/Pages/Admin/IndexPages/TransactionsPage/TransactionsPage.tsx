import { useEffect, useState } from "react";
import classes from "../IndexPage.module.scss";
import {
  GetAllProps,
  Transaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
} from "../../../../Api/TransactionApi";
import ItemTable from "../../../../Components/Admin/ItemTable";
import { Link } from "react-router-dom";
import Forms from "../../../../Components/Admin/Forms";
import Search from "../../../../Components/Admin/SearchSettings";
import { getCategories } from "../../../../Api/CategoryApi";
import { Category } from "../../../../Types/Interfaces";
export const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  const transactionGetter = async () => {
    setStatus("Loading...");
    const transactions = await getTransactions();
    console.log(transactions);
    if (transactions?.items) {
      setTransactions(transactions.items);
      setTotalPages(transactions.pageInfo.totalPages || 1);
      setTotalItems(transactions.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${transactions.pageInfo.page} of ${transactions.pageInfo
          .totalPages!}`
      );
      setStatus("Transactions fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  const transactionSearch = async (parameters: GetAllProps) => {
    setStatus("Loading...");
    const transactions = await getTransactions(parameters);
    if (transactions?.items) {
      setTransactions(transactions.items);
      console.log(transactions);
      setTotalPages(transactions.pageInfo.totalPages || 1);
      setTotalItems(transactions.pageInfo.totalItems || 1);
      setPageInfo(
        `Page ${transactions.pageInfo.page} of ${transactions.pageInfo
          .totalPages!}`
      );
      setStatus("Transactions fetched successfully");
    } else {
      setStatus("Something went wrong");
    }
  };

  useEffect(() => {
    transactionGetter();
  }, []);

  const handleDeleteTransaction = async (id: string) => {
    const result = await deleteTransaction(id);
    if (result) {
      setTransactions(transactions.filter((category) => category.id !== id));
      setStatus("Transaction deleted successfully");
    } else {
      setStatus("Something went wrong");
    }
  };


  return (
    <div className={classes.Page}>
      <h1>Transactions</h1>
      <p>The page where you can edit, view, delete and create transactions</p>
      <div className={classes.PageContainer}>
        <ItemTable
          items={transactions.map((transaction) => {
            return {
              id: transaction.id,
              Product: transaction.productName,
              User: transaction.userName,
              PricePerUnit: `${transaction.pricePerUnit} eur`,
              productId: transaction.productId,
              userId: transaction.userId,
              Created: `${new Date(
                transaction.createdAt
              ).toLocaleDateString()}`,
              Quantity: transaction.quantity,
              TotalPrice: `${
                Math.round(
                  transaction.pricePerUnit * transaction.quantity * 100
                ) / 100
              } eur`,
            };
          })}
          links={[
            { name: "Product", link: "productId", type: "products" },
            { name: "User", link: "userId", type: "users" },
          ]}
          important={[
            "Product",
            "User",
            "PricePerUnit",
            "Created",
            "Quantity",
            "TotalPrice",
          ]}
          deleteItem={handleDeleteTransaction} 
          type="transactions"
        />
      </div>
      <div className={classes.PageActions}>
        <div className={classes.TransactionPageSearch}>
          <Search.TransactionSearch search={transactionSearch} />
        </div>
        <div className={classes.TransactionPageCreate}>
          <span>Only users can make transactions</span>
        </div>
      </div>
    </div>
  );
};
