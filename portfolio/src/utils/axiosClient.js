import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://portfolio-backend-d9k6.onrender.com/api",
  withCredentials: true,
});
