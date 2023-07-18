import axios from "axios";

import { PaginationResult, ActionResult, Pagination, Sorting } from "./Shared";

export interface Subcategory {
  id: string;
  name: string;
  subSchema: object;
  description: string;
  categoryId: string;
}

export interface NewSubcategory {
  id?: string;
  name: string;
  subSchema: object;
  description: string;
  categoryId: string;
}

export interface GetAllProps {
  pagination?: Pagination;
  sorting?: Sorting;
  description?: string;
  name?: string;
  categoryId?: string;
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

export const getSubcategories = async (props: GetAllProps | {} = {}) => {
  try {
    const response = await api.get<PaginationResult<Subcategory>>(
      "/subcategories",
      { params: props }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getSubcategory = async (id: string) => {
  try {
    const response = await api.get<Subcategory>(`/subcategories/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const createSubcategory = async (
  subcategory: NewSubcategory
): Promise<boolean> => {
  try {
    const response: ActionResult = await api.post(
      "/subcategories",
      subcategory
    );
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateSubcategory = async (
  subcategory: NewSubcategory
): Promise<boolean> => {
  try {
    const response: ActionResult = await api.put(
      `/subcategories/${subcategory.id!}`,
      subcategory
    );
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteSubcategory = async (id: string): Promise<boolean> => {
  try {
    const response: ActionResult = await api.delete(`/subcategories/${id}`);
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};