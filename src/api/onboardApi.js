import http from "http/http";
import { ONBOARD } from "utils/endpoints";

const getUsersData = async ({ queryKey }) => {
  console.log(queryKey);

  const reponse = await http({
    method: "GET",
    url: ONBOARD.getUsers,
  });
  return reponse;
};


export const onboardApi = { getUsersData };
