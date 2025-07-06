import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

// Инстанс с токеном (для авторизованных запросов)
// export const authApi = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: { authorization: `Bearer ${Cookies.get("token")}` },
// });

// Еще можно через интерсепторы если боле сложная логика
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  console.log(token);
  if (!token) {
    throw new Error("Tocken is not found"); // Отменяем запрос и выбрасываем ошибку
    // return Promise.reject(new Error("Token is not found"));
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
