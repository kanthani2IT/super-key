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
const getUserById = async (id) => {
  console.log(id, "id");

  const reponse = await http({
    method: "GET",
    url: ONBOARD.getUserById(id),
  });
  return reponse;
};

export const onboardApi = { getUsersData, getUserById };
