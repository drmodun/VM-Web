import axios from "axios";
import { ActionResult, Pagination, PaginationResult, Sorting, baseUrl } from "./Shared";
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  categoryId: string;
  subcategoryId: string;
  companyId: string;
  description: string;
  date: string;
  attributes: object;
  subAttributes: object;
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
  pagination?: Pagination;
  sorting?: Sorting;
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

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
   //later add auth fail log
      console.log(error);
    
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
    return {};
  }
};

export const createProduct = async (product: NewProduct): Promise<boolean> => {
  try {
    const response = await api.post("/products", product);
    const result = response.data as ActionResult;
    return result.success as boolean;
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
