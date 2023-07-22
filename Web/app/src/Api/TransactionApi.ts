import axios from "axios";

import {
  PaginationResult,
  ActionResult,
  Pagination,
  Sorting,
  baseUrl,
} from "./Shared";
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
 "Pagination.PageNumber"? : number;
  "Pagination.PageSize"? : number;
  "Sorting.Attribute"? : number;
  "Sorting.SortType"? : number;
  minPrice?: number;
  maxPrice?: number;
  userId?: string;
  productId?: string;
  createdAt?: Date;
  type?: TransactionType;
}

const api = axios.create({
  baseURL: baseUrl,
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


export const getCategories = async (props: GetAllProps | {} = {}) => {
  try {
    const response = await api.get<PaginationResult<Transaction>>(
      "/transactions",
      {
        params: props,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTransaction = async (id: string) => {
  try {
    const response = await api.get<Transaction>(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const createTransaction = async (
  transaction: NewTransaction
): Promise<boolean> => {
  try {
    const response = await api.post("/transactions", transaction);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateTransaction = async (
  transaction: NewTransaction
): Promise<boolean> => {
  try {
    const response = await api.put(
      `/transactions/${transaction.id!}`,
      transaction
    );
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteTransaction = async (id: string): Promise<boolean> => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};
