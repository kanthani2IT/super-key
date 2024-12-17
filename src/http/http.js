import axios from "axios";
import privateAxios from "./interceptor/privateAxios";

const apiBaseUrl = import.meta.env.VITE_API_URL;

// Axios instance for general JSON requests
const http = axios.create({
  baseURL: `${apiBaseUrl}/`,
  headers: {
    "Content-Type": "application/json", // For API requests with JSON payload
  },
});

// Axios instance for form-data (file uploads)
const formDataHttp = axios.create({
  baseURL: `${apiBaseUrl}/`,
  headers: {
    "Content-Type": "multipart/form-data", // For API requests with file upload
  },
  // Uncomment if you need credentials (cookies) to be sent with requests
  // withCredentials: true, // todo
});

// Apply privateAxios interceptors to handle authentication (if required)
privateAxios(formDataHttp);  // Apply interceptors for form-data HTTP requests if necessary
privateAxios(http);  // Apply interceptors for standard HTTP requests if necessary

// Export both instances, `http` as the default and `formDataHttp` as a named export
export { formDataHttp };
export default http;
