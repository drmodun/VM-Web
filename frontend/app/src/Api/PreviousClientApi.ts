import axios from "axios";

import {
  PaginationResult,
  ActionResult,
  Pagination,
  Sorting,
  baseUrl,
  api,
} from "./Shared";

export interface PreviousClient {
  name: string;
  id: string;
  rating: number;
  website: string;
  description: string;
}

export interface NewPreviousClient {
  id?: string;
  name: string;
  rating: number;
  website: string;
  description: string;
}

export interface GetAllProps {
  "Pagination.PageNumber"?: number;
  "Pagination.PageSize"?: number;
  "Sorting.Attribute"?: number;
  "Sorting.SortType"?: number;
  description?: string;
  name?: string;
  minRating?: number;
}


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

export const getPreviousClients = async (props: GetAllProps | {} = {}) => {
  try {
    const response = await api.get<PaginationResult<PreviousClient>>(
      "/previous-clients",
      {
        params: props,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPreviousClient = async (id: string) => {
  try {
    const response = await api.get<PreviousClient>(`/previous-clients/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createPreviousClient = async (
  previousClient: NewPreviousClient
): Promise<ActionResult | null> => {
  try {
    const response = await api.post("/previous-clients", previousClient);
    const result = response.data as ActionResult;
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updatePreviousClient = async (
  previousClient: NewPreviousClient
): Promise<ActionResult | null> => {
  try {
    const response = await api.put(
      `/previous-clients/${previousClient.id!}`,
      previousClient
    );
    const result = response.data as ActionResult;
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deletePreviousClient = async (
  id: string
): Promise<ActionResult | null> => {
  try {
    const response = await api.delete(`/previous-clients/${id}`);
    const result = response.data as ActionResult;
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
