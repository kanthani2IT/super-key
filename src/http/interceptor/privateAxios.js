import { useAuthCookies } from "utils/cookie";
import { useCookies } from "react-cookie";

const privateAxios = (http) => {
  const { cookies } = useCookies();
  console.log(cookies);
  return http.interceptors.request.use(
    (config) => {
      const token = "1234";
      console.log(token);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default privateAxios;
