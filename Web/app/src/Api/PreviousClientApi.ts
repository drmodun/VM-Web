import axios from "axios";

import { PaginationResult, ActionResult, Pagination, Sorting, baseUrl } from "./Shared";

export interface PreviousClient {
  id: string;
  name: string;
  image: string;
  rating: number;
  website: string;
  description: string;
}

export interface NewPreviousClient {
  id?: string;
  name: string;
  image: string;
  rating: number;
  website: string;
  description: string;
}

export interface GetAllProps {
 "Pagination.PageNumber"? : number;
  "Pagination.PageSize"? : number;
  "Sorting.Attribute"? : number;
  "Sorting.SortType"? : number;
  description?: string;
  name?: string;
  minRating?: number;
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



export const getCategories = async (props: GetAllProps | {} = {}) => {
  try {
    const response = await api.get<PaginationResult<PreviousClient>>(
      "/previousClients",
      {
        params: props,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPreviousClient = async (id: string) => {
  try {
    const response = await api.get<PreviousClient>(`/previousClients/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const createPreviousClient = async (
  previousClient: NewPreviousClient
): Promise<boolean> => {
  try {
    const response = await api.post("/previousClients", previousClient);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updatePreviousClient = async (
  previousClient: NewPreviousClient
): Promise<boolean> => {
  try {
    const response = await api.put(
      `/previousClients/${previousClient.id!}`,
      previousClient
    );
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deletePreviousClient = async (id: string): Promise<boolean> => {
  try {
    const response = await api.delete(`/previousClients/${id}`);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};
