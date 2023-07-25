import axios from "axios";

import { PaginationResult, ActionResult, Pagination, Sorting, baseUrl } from "./Shared";
import { ServiceType, StatusType } from "../Types/Enums";

export interface Order {
  id: string;
  serviceId: string;
  userId: string;
  serviceName: string;
  userName: string;
  statusType: StatusType;
  deadline?: Date;
  craeted: Date;
}

export interface NewOrder {
  serviceId: string;
  userId: string;
}

export interface UpdateOrder {
  id: string;
  statusType: StatusType;
  deadline?: Date;
  serviceId: string;
  userId: string;
}

export interface GetAllProps {
 "Pagination.PageNumber"? : number;
  "Pagination.PageSize"? : number;
  "Sorting.Attribute"? : number;
  "Sorting.SortType"? : number;
  maxPrice?: number;
  minPrice?: number;
  userId?: string;
  serviceId?: string;
  orderDate?: Date;
  serviceType?: ServiceType;
  statusType?: StatusType;
  deadline?: Date;
}

const api = axios.create({
  baseURL: 
baseUrl ,
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



export const getOrders = async (props: GetAllProps | {} = {}) => {
  try {
    const response = await api.get<PaginationResult<Order>>("/orders", {
      params: props,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrder = async (id: string) => {
  try {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createOrder = async (order: NewOrder): Promise<boolean> => {
  try {
    const response = await api.post("/orders", order);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateOrder = async (order: UpdateOrder): Promise<boolean> => {
  try {
    const response = await api.put(`/orders/${order.id!}`, order);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  try {
    const response = await api.delete(`/orders/${id}`);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};
