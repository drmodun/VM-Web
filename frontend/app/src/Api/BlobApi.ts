import axios from "axios";
import { baseUrl } from "./Shared";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
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

export const UploadFile = async (data: FormData) => {
  try {
    const response = await api.post("/files/upload/" + data.get("name"), data, {
      params: { directory: data.get("directory") },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return "";
  }
};
//TODO: maybe add image deletion later
export const UpdateFile = async (data: FormData) => {
  try {
    const response = await api.put("/files/upload/" + data.get("name"), data, {
      params: { directory: data.get("directory") },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return "";
  }
};
