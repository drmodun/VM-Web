import axios from "axios";

import { PaginationResult, ActionResult, Pagination, Sorting } from "./Shared";

export interface Company {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
}

export interface NewCompany {
  id?: string;
  name: string;
  logo: string;
  description: string;
  website: string;
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
    return response.data;
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
    const response = await api.get<PaginationResult<Company>>("/companies", {
      params: props,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCompany = async (id: string) => {
  try {
    const response = await api.get<Company>(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const createCompany = async (company: NewCompany): Promise<boolean> => {
  try {
    const response = await api.post("/companies", company);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateCompany = async (company: NewCompany): Promise<boolean> => {
  try {
    const response = await api.put(`/companies/${company.id!}`, company);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteCompany = async (id: string): Promise<boolean> => {
  try {
    const response = await api.delete(`/companies/${id}`);
    const result = response.data as ActionResult;
    return result.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};
