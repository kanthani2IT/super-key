import { useCookies } from "react-cookie";

export const useAuthCookies = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const getCookie = (key = "") => {
    return cookies[key];
  };

  const setAuthCookie = (key, value) => {
    setCookie(key, value, { path: "/" });
  };

  const removeAuthCookie = (key) => {
    removeCookie(key, { path: "/" });
  };

  return { getCookie, setAuthCookie, removeAuthCookie };
};
