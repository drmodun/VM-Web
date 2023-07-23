import axios from "axios";
import {
  ActionResult,
  Pagination,
  PaginationResult,
  Sorting,
  baseUrl,
} from "./Shared";
export interface User {
  id: string;
  name: string;
  email: string;
  lastUpdate: Date;
  phoneNumber: string;
  address: string;
}

export interface NewUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
}

export interface GetAllProps {
  "Pagination.PageNumber"? : number;
  "Pagination.PageSize"? : number;
  "Sorting.Attribute"? : number;
  "Sorting.SortType"? : number;
  name?: string;
  email?: string;
  address?: string;
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


export const getUsers = async (params: GetAllProps | {} = {}) => {
  try {
    const response = await api.get<PaginationResult<User>>("/users", {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (user: NewUser): Promise<boolean> => {
  try {
    const response = await api.post("/users", user);
    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//TODO: Upadte user apis with new constracts and stuff, also try to make teh editing process make more sense

export const updateUser = async (user: NewUser): Promise<boolean> => {
  try {
    const response = await api.put(`/admin/users/${user.id}`, user);
    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};
