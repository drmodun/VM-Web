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
    const response = await api.get<PaginationResult<Company>>("/companies", {
      params: props,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getCompany = async (id: string) => {
  try {
    const response = await api.get<Company>(`/companies/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const createCompany = async (company: NewCompany): Promise<boolean> => {
  try {
    const response: ActionResult = await api.post("/companies", company);
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateCompany = async (company: NewCompany): Promise<boolean> => {
  try {
    const response: ActionResult = await api.put(
      `/companies/${company.id!}`,
      company
    );
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteCompany = async (id: string): Promise<boolean> => {
  try {
    const response: ActionResult = await api.delete(`/companies/${id}`);
    return response.success as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};
