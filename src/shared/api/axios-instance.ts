import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// export const protectedApi = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// protectedApi.interceptors.request.use((config) => {
//   const token = Cookies.get("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     throw new Error("Cancel query. Token is not found");
//   }
//   return config;
// });
