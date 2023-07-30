import axios from "axios";

import {
  PaginationResult,
  ActionResult,
  Pagination,
  Sorting,
  baseUrl,
} from "./Shared";
import { Indexable } from "../Types/Interfaces";

export interface Subcategory {
  id: string;
  name: string;
  subSchema: Indexable;
  description: string;
  categoryId: string;
  categoryName: string;
}

export interface NewSubcategory {
  id?: string;
  name: string;
  subSchema: Indexable;
  description: string;
  categoryId: string;
}

export interface GetAllProps {
  "Pagination.PageNumber"?: number;
  "Pagination.PageSize"?: number;
  "Sorting.Attribute"?: number;
  "Sorting.SortType"?: number;
  description?: string;
  name?: string;
  categoryId?: string;
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
export const getSubcategories = async (props: GetAllProps | {} = {}) => {
  try {
    const response = await api.get<PaginationResult<Subcategory>>(
      "/subcategories",
      { params: props }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSubcategory = async (id: string) => {
  try {
    const response = await api.get<Subcategory>(`/subcategories/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createSubcategory = async (
  subcategory: NewSubcategory
): Promise<boolean> => {
  try {
    const response = await api.post("/subcategories", subcategory);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateSubcategory = async (
  subcategory: NewSubcategory
): Promise<boolean> => {
  try {
    const response = await api.put(
      `/subcategories/${subcategory.id!}`,
      subcategory
    );
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteSubcategory = async (id: string): Promise<boolean> => {
  try {
    const response = await api.delete(`/subcategories/${id}`);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};
