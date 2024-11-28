import http from "http/http";
import { getRequest, putRequest } from "http/request";
import { ONBOARD } from "utils/endpoints";
import { addQueryParams } from "utils/helpers";

const getUsersData = async ({ queryKey }) => {
  console.log(queryKey);

  const reponse = await http({
    method: "GET",
    url: ONBOARD.getUsers,
  });
  return reponse;
};
const getUserById = async (id) => {
  try {
    const requestUrl = addQueryParams(ONBOARD.getUserById(id));
    console.log(id, "afteridin api");
    console.log(requestUrl, "reurl");
    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};
const updateUserById = async (id, body) => {
  try {
    const requestUrl = ONBOARD.updateUserById(id);

    const response = await putRequest(requestUrl, body);
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUserById = async (id, body) => {
  try {
    const requestUrl = addQueryParams(ONBOARD.updateUserById(id));

    const response = await putRequest(requestUrl, body);

    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const onboardApi = {
  getUsersData,
  getUserById,
  updateUserById,
  deleteUserById,
};
