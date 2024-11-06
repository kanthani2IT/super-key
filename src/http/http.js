import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL;
const http = axios.create({
  baseURL: `${apiBaseUrl}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// const setupAuthInterceptor = (navigate) => {
//   logoutOn401(http, navigate);
// };

// const useAuthInterceptor = () => {
//   const navigate = useNavigate();
//   setupAuthInterceptor(navigate);
// };

// useAuthInterceptor();

export default http;

const getData = async ({ queryKey }) => {
  console.log(queryKey);

  const reponse = await http({
    method: "GET",
    url: "",
  });
  return reponse;
};
