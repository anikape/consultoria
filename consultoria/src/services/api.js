import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  proxy: {
    protocol: "http",
    host: import.meta.env.VITE_BASE_API_URL,
    // port: 9000,
    // auth: {
    //   username: "mikeymike",
    //   password: "rapunz3l",
    // },
  },
});
