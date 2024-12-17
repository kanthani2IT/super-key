import { useAuthCookies } from "utils/cookie";
import { mergeCMCId } from "utils/helpers";

const privateAxios = (http) => {
  // Attach request interceptor
  http.interceptors.request.use(
    (config) => {
      const { getCookie } = useAuthCookies();

      const authToken = getCookie("token");
      config.url = mergeCMCId(config.url);
      if (authToken) {
        config.headers["Authorization"] = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );

  // Attach response interceptor (optional: handle token expiration globally)
  http.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized errors (e.g., redirect to login)
        console.error("Unauthorized! Redirecting to login...");
      }
      return Promise.reject(error);
    }
  );

  return http;
};

export default privateAxios;
