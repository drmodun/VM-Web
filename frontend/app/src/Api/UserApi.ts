import axios from "axios";
import {
  ActionResult,
  Pagination,
  PaginationResult,
  Sorting,
  accountInfo,
  baseUrl,
  jwt,
  parseJwt,
  setJwt,
} from "./Shared";
import { Order } from "./OrderApi";
import { Transaction } from "./TransactionApi";
import { Token } from "react-stripe-checkout";
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

export interface GetMe {
  user: User;
  orders: Order[];
  transactions: Transaction[];
  totalSpent: number;
  transactionCount: number;
  orderCount: number;
}

export interface CartItem {
  pricePerUnit: number;
  productId: string;
  categoryId: string;
  brandId: string;
  brandName: string;
  maxQuantity: number;
  productName: string;
  subcategoryName: string;
  subcategoryId: string;
  categoryName: string;
  total: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}

export interface GetAllProps {
  "Pagination.PageNumber"?: number;
  "Pagination.PageSize"?: number;
  "Sorting.Attribute"?: number;
  "Sorting.SortType"?: number;
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
    if (
      (token && ["post", "put", "delete"].includes(config.method || "")) ||
      (token && config.url?.includes("short")) ||
      (token && config.url?.includes("cart")) ||
      (token && config.url?.includes("me"))
    ) {
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

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/users/login", { email, password });
    localStorage.setItem("token", response.data);
    setJwt(response.data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const adminLogin = async (email: string, password: string) => {
  try {
    const response = await api.post("/users/login", { email, password });
    const obj = parseJwt(response.data);
    if (!obj.admin) {
      return false;
    }
    localStorage.setItem("token", response.data);
    setJwt(response.data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const addToCart = async (productId: string, quantity: number) => {
  try {
    const response = await api.post("/users/cart/" + productId, quantity);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getCart = async () => {
  try {
    const response = await api.get("/users/cart");
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const removeFromCart = async (productId: string) => {
  try {
    const response = await api.delete("/users/cart/" + productId);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateCart = async (productId: string, quantity: number) => {
  try {
    const response = await api.put("/users/cart/" + productId, quantity);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const Checkout = async () => {
  try {
    const response = await api.post("/make-payment", {
      receiptEmail: accountInfo.email,
      description:
        "Payment to vm-racunala for cart items, see more details at the user dashboard",
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export interface updateUserInfo {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
}

export const EditUser = async (request: updateUserInfo) => {
  try {
    const response = await api.put("/users/edit", request);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get<GetMe>("/users/me");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const handleToken = async (token: Token) => {
  console.log(token);
  if (!accountInfo) {
    return;
  }
  const response = await api.post("/add-customer", {
    email: accountInfo.email,
    name: accountInfo.name,
    tokenId: token.id,
  });
  console.log(response.data);
};
