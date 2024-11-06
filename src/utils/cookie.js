import { useCookies } from "react-cookie";

export const useAuthCookies = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const getCookie = () => {
    return cookies.user;
  };

  const setAuthCookie = (token) => {
    setCookie("user", token, { path: "/" });
  };

  const removeAuthCookie = () => {
    removeCookie("user", { path: "/" });
  };

  return { getCookie, setAuthCookie, removeAuthCookie };
};
