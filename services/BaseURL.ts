import axios from "axios";

export const BaseServiceURL = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
BaseServiceURL.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
