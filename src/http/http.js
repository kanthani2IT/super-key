import axios from "axios";
import privateAxios from "./interceptor/privateAxios";

const apiBaseUrl = import.meta.env.VITE_API_URL;
const http = axios.create({
  baseURL: `${apiBaseUrl}/`,
  headers: {
    "Content-Type": "application/json",
    // Accept: "application/json",
  },
  // withCredentials: true, -- todo
});

// Add interceptors for error handling and token management
// privateAxios(http);
export default http;
