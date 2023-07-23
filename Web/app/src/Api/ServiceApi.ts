import axios from "axios";
import { ServiceType } from "../Types/Enums";
import { ActionResult, Pagination, PaginationResult, Sorting, baseUrl } from "./Shared";
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
 "Pagination.PageNumber"? : number;
  "Pagination.PageSize"? : number;
  "Sorting.Attribute"? : number;
  "Sorting.SortType"? : number;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  serviceType?: ServiceType;
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



export const getServices = async (props?: GetAllProps) => {
  try {
    const response = await api.get<PaginationResult<Service>>("services", { params: props });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
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

export const deleteService = async (id: string): Promise<boolean> => {
  try {
    const response = await api.delete(`services/${id}`);
    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};
