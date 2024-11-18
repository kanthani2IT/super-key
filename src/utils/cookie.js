import Cookies from "js-cookie"; // Import js-cookie

export const useAuthCookies = () => {
  // Function to get a cookie
  const getCookie = (key = "") => {
    return Cookies.get(key); // Directly get the cookie by key
  };

  // Function to set a cookie
  const setAuthCookie = (key, value) => {
    Cookies.set(key, value, { path: "/" }); // Set the cookie with a path
  };

  // Function to remove a cookie
  const removeAuthCookie = (key) => {
    Cookies.remove(key, { path: "/" }); // Remove the cookie with the specified path
  };

  return { getCookie, setAuthCookie, removeAuthCookie };
};
