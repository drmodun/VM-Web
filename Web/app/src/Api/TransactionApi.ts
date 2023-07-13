import axios from "axios";

import { PaginationResult, ActionResult, Pagination, Sorting } from "./Shared";
import { TransactionType } from "../Types/Enums";

export interface Transaction {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  userName: string;
  productName: string;
  createdAt: Date;
  transactionType: TransactionType;
}

export interface NewTransaction {
  id?: string;
  userId: string;
  productId: string;
  quantity: number;
  type: TransactionType;
}

export interface GetAllProps {
  pagination?: Pagination;
  sorting?: Sorting;
  minPrice?: number;
  maxPrice?: number;
  userId?: string;
  productId?: string;
  createdAt?: Date;
  type?: TransactionType;
}

const api = axios.create({
  baseURL: "https://localhost:44336/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && ["post", "put", "delete"].includes(config.method || "")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized");
    } else {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export const getCategories = async (props: GetAllProps | {} = {}) => {
  try {
    const response = await api.get<PaginationResult<Transaction>>(
      "/transactions",
      {
        params: props,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTransaction = async (id: string) => {
  try {
    const response = await api.get<Transaction>(`/transactions/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const createTransaction = async (
  transaction: NewTransaction
): Promise<boolean> => {
  try {
    const response: ActionResult = await api.post("/transactions", transaction);
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateTransaction = async (
  transaction: NewTransaction
): Promise<boolean> => {
  try {
    const response: ActionResult = await api.put(
      `/transactions/${transaction.id!}`,
      transaction
    );
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteTransaction = async (id: string): Promise<boolean> => {
  try {
    const response: ActionResult = await api.delete(`/transactions/${id}`);
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};
