import Cookies from "js-cookie"; // Import js-cookie

export const useAuthCookies = () => {
  // Function to get a cookie
  const getCookie = (key = "") => {
    const cookieValue = Cookies.get([key]);
  try {
    return JSON.parse(cookieValue); // Parse string back into object
  } catch (error) {
    return cookieValue; // Return as is if parsing fails
  }
  
  };

  // Function to set a cookie
  const setAuthCookie = (key, value) => {
    const stringifiedValue = JSON.stringify(value);

    Cookies.set(key, stringifiedValue, { path: "/" }); // Set the cookie with a path
  };

  // Function to remove a cookie
  const removeAuthCookie = (key) => {
    Cookies.remove(key, { path: "/" }); // Remove the cookie with the specified path
  };

  return { getCookie, setAuthCookie, removeAuthCookie };
};
