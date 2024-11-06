import http from "http/http";
import { LOGIN } from "utils/endpoints";

const getUserData = async ({ queryKey }) => {
  console.log(queryKey);

  const reponse = await http({
    method: "GET",
    url: LOGIN.getUser,
  });
  return reponse;
};

export const loginApi = { getUserData };
