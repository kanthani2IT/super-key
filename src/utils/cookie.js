import Cookies from "js-cookie";

export const useAuthCookies = () => {
  const getCookie = (key = "") => {
    const cookieValue = Cookies.get([key]);
    try {
      return JSON.parse(cookieValue);
    } catch (error) {
      return cookieValue;
    }
  };

  // Function to set a cookie
  const setAuthCookie = (key, value) => {
    const stringifiedValue = JSON.stringify(value);

    Cookies.set(key, stringifiedValue, { path: "/" });
  };

  // Function to remove a cookie
  const removeAuthCookie = (key) => {
    Cookies.remove(key, { path: "/" });
  };

  return { getCookie, setAuthCookie, removeAuthCookie };
};
