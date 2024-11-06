import { useCookies } from "react-cookie";

export const useAuthCookies = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const getCookie = (key="") => {
    return cookies[key];
  };

  const setAuthCookie = ( key, value) => {
    setCookie(key, value, { path: "/" });
  };

  const removeAuthCookie = () => {
    removeCookie("user", { path: "/" });
  };

  return { getCookie, setAuthCookie, removeAuthCookie };
};
