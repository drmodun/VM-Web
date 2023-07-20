import axios from "axios";

import { PaginationResult, ActionResult, Pagination, Sorting, baseUrl } from "./Shared";

export interface Category {
  id: string;
  name: string;
  schema: object;
  description: string;
}

export interface NewCategory {
  id?: string;
  name: string;
  schema: object;
  description: string;
}

export interface GetAllProps {
  pagination?: Pagination;
  sorting?: Sorting;
  description?: string;
  name?: string;
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

export const getCategories = async (props: GetAllProps | {} = {}) => {
  try {
    const response = await api.get<PaginationResult<Category>>("/categories", {
      params: props,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategory = async (id: string) => {
  try {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const createCategory = async (
  category: NewCategory
): Promise<boolean> => {
  try {
    const response = await api.post("/categories", category);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateCategory = async (
  category: NewCategory
): Promise<boolean> => {
  try {
    const response = await api.put(`/categories/${category.id!}`, category);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteCategory = async (id: string): Promise<boolean> => {
  try {
    const response = await api.delete(`/categories/${id}`);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};
