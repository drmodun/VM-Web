import axios from "axios";

import { PaginationResult, ActionResult, Pagination, Sorting } from "./Shared";

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
    const response = await api.get<PaginationResult<Category>>("/categories", {
      params: props,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getCategory = async (id: string) => {
  try {
    const response = await api.get<Category>(`/categories/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const createCategory = async (
  category: NewCategory
): Promise<boolean> => {
  try {
    const response: ActionResult = await api.post("/categories", category);
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateCategory = async (
  category: NewCategory
): Promise<boolean> => {
  try {
    const response: ActionResult = await api.put(
      `/categories/${category.id!}`,
      category
    );
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteCategory = async (id: string): Promise<boolean> => {
  try {
    const response: ActionResult = await api.delete(`/categories/${id}`);
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};
