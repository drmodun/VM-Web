import axios from "axios";
import { ActionResult, Pagination, PaginationResult, Sorting } from "./Shared";
export interface User{
    id: string;
    name: string;
    email: string;
    lastUpdate : Date;
    address: string;
}

export interface NewUser{
    id? : string;
    name: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
}

export interface GetAllProps{
    pagination?: Pagination;
    sorting?: Sorting;
    name? : string;
    email? : string;
    address? : string;
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
          console.log("Unauthorized")
        } else {
          console.log(error)
        }
        return Promise.reject(error);
      }
    ); 

export const getUsers = async (params : GetAllProps | {} = {}) => {
    try{
    const response = await api.get<PaginationResult<User>>("/users", {params: params});
    return response;
    }
    catch(error){
        console.error(error);
    }
}

export const getUser = async (id: string) => {
    try{
        const response = await api.get<User>(`/users/${id}`);
        return response;
    }
    catch(error){
        console.error(error);
    }
}

export const createUser = async (user: NewUser) : Promise<boolean> => {
    try{
        const response: ActionResult = await api.post("/users", user);
        return response.success;
    }
    catch(error){
        console.error(error);
        return false;
    }
}

export const updateUser = async (user: User) : Promise<boolean> => {
    try{
        const response: ActionResult = await api.put(`/users/${user.id}`, user);
        return response.success;
    }
    catch(error){
        console.error(error);
        return false;
    }
}

export const deleteUser = async (id: string) : Promise<boolean> => {
    try{
        const response: ActionResult = await api.delete(`/users/${id}`);
        return response.success;
    }
    catch(error){
        console.error(error);
        return false;
    }
}

