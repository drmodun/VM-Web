import axios from "axios";
import { ServiceType } from "../Types/Enums";
import { ActionResult, Pagination, Sorting } from "./Shared";
import { ActionFunction } from "react-router-dom";

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  serviceType: ServiceType;
}

export interface NewService {
  id?: string;
  name: string;
  price: number;
  description: string;
  serviceType: ServiceType;
}

export interface GetAllProps {
  pagination?: Pagination;
  sorting?: Sorting;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  serviceType?: ServiceType;
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
    return response.data;
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

export const getAllServices = async (props?: GetAllProps) => {
  try {
    const response = await api.get<Service[]>("services", { params: props });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getService = async (id: string) => {
  try {
    const response = await api.get<Service>(`services/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createService = async (props: NewService): Promise<boolean> => {
  try {
    const response = await api.post("services", props);
    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateService = async (props: Service): Promise<boolean> => {
  try {
    const response = await api.put(`services/${props.id}`, props);
    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const removeService = async (id: string): Promise<boolean> => {
  try {
    const response = await api.delete(`services/${id}`);
    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};
