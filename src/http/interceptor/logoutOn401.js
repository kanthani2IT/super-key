import { useAuthCookies } from "utils/cookie";

export const logoutOn401 = (axios, navigate) => {
  const { removeAuthCookie } = useAuthCookies();

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        removeAuthCookie();
        navigate("/");
      }
      throw error;
    }
  );
};
