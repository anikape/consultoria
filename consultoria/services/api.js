import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3003/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  getUser: (endpoint, payload) => http.post(endpoint, payload),
};
