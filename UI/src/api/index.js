import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5566",
  //baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

export const httpClient = axios.create({
  baseURL: "https://localhost:44335/api",
});

export default api;
