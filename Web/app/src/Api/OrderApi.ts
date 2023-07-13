import axios from "axios";

import { PaginationResult, ActionResult, Pagination, Sorting } from "./Shared";
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
  pagination?: Pagination;
  sorting?: Sorting;
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
    const response = await api.get<PaginationResult<Order>>("/orders", {
      params: props,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getOrder = async (id: string) => {
  try {
    const response = await api.get<Order>(`/orders/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const createOrder = async (order: NewOrder): Promise<boolean> => {
  try {
    const response: ActionResult = await api.post("/orders", order);
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateOrder = async (order: UpdateOrder): Promise<boolean> => {
  try {
    const response: ActionResult = await api.put(`/orders/${order.id!}`, order);
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  try {
    const response: ActionResult = await api.delete(`/orders/${id}`);
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};
