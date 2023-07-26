import axios from "axios";
import { ActionResult, Pagination, PaginationResult, Sorting, baseUrl } from "./Shared";
import { Indexable } from "../Types/Interfaces";
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  categoryId: string;
  subcategoryId: string;
  companyId: string;
  description: string;
  quantity: number;
  lastUpdated: Date;
  attributes: Indexable;
  subAttributes: Indexable;
  categoryName: string;
  subcategoryName: string;
  companyName: string;
}

export interface NewProduct {
  id?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  categoryId: string;
  subcategoryId: string;
  companyId: string;
  description: string;
  attributes: object;
  subAttributes: object;
}

export interface GetAllProps {
 "Pagination.PageNumber"? : number;
  "Pagination.PageSize"? : number;
  "Sorting.Attribute"? : number;
  "Sorting.SortType"? : number;
  name?: string;
  categoryId?: string;
  subcategoryId?: string;
  companyId?: string;
  minPrice?: number;
  maxPrice?: number;
  maxQuantity?: number;
  minQuantity?: number;
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



export const getProducts = async (props: GetAllProps | {} = {}) => {
  try {
    const response = await api.get<PaginationResult<Product>>("/products", {
      params: props,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createProduct = async (product: NewProduct): Promise<boolean> => {
  try {
    const response = await api.post("/products", product);
    const result = response.data as ActionResult;
    console.log(response.data);
    return response.data.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateProduct = async (product: NewProduct): Promise<boolean> => {
  try {
    const response = await api.put(`/products/${product.id!}`, product);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const response = await api.delete(`/products/${id}`);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};