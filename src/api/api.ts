import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const apiWithBearer = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const apiRegion = axios.create({
  baseURL: import.meta.env.VITE_REGION_API,
});
