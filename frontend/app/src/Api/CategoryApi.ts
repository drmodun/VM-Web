import axios from "axios";

import {
  PaginationResult,
  ActionResult,
  Pagination,
  Sorting,
  baseUrl,
  jwt,
} from "./Shared";
import { Indexable } from "../Types/Interfaces";
import { ShortSubcategory } from "./SubcategoryApi";
import { ShortProduct } from "./ProductApi";
import { ShortCompany } from "./CompanyApi";

export interface Category {
  id: string;
  name: string;
  schema?: Indexable;
  description: string;
  website?: string;
}

export interface NewCategory {
  id?: string;
  name: string;
  schema?: object;
  description: string;
  website?: string;
}

export interface GetLargeCategory {
  id: string;
  name: string;
  description: string;
  subcategories: ShortCategory[];
  brands: ShortCompany[];
}

export interface GetAllProps {
  "Pagination.PageNumber"?: number;
  "Pagination.PageSize"?: number;
  "Sorting.Attribute"?: number;
  "Sorting.SortType"?: number;
  description?: string;
  name?: string;
}

export interface ShortCategory {
  id: string;
  name: string;
  numberOfProducts: number;
  website?: string;
}

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = jwt;
    if (token && ["post", "put", "delete"].includes(config.method || "")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
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

export const getShortCategories = async (props: GetAllProps | {} = {}) => {
  try {
    const response = await api.get<PaginationResult<ShortCategory>>(
      "/categories/short",
      {
        params: props,
      }
    );
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
    return null;
  }
};

export const createCategory = async (
  category: NewCategory
): Promise<ActionResult | null> => {
  try {
    const response = await api.post("/categories", category);
    const result = response.data as ActionResult;
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateCategory = async (
  category: NewCategory
): Promise<ActionResult | null> => {
  try {
    const response = await api.put(`/categories/${category.id!}`, category);
    const result = response.data as ActionResult;
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getLargeCategory = async (id: string) => {
  try {
    const response = await api.get<GetLargeCategory>(`/categories/large/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
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
