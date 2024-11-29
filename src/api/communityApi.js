import http from "http/http";
import { getRequest, postRequest, putRequest } from "http/request";
import { COMMUNITY, ONBOARD } from "utils/endpoints";
import { addQueryParams } from "utils/helpers";

const getUsersData = async ({ queryKey }) => {
  const reponse = await http({
    method: "GET",
    url: ONBOARD.getUsers,
  });
  return reponse;
};
const getUserById = async (id) => {
  try {
    const requestUrl = addQueryParams(ONBOARD.getUserById(id));
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

const createCommunity = async (payload) => {
  const reponse = await postRequest(COMMUNITY.createCommunity, payload);
  return reponse;
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

const getAllCommunityList = async (queries) => {
  try {
    const requestUrl = addQueryParams(COMMUNITY.getAllCommunityList, queries);
    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching communities:", error);
    throw error;
  }
};

export const communityApi = {
  getUsersData,
  getUserById,
  updateUserById,
  deleteUserById,
  createCommunity,
  getAllCommunityList,
};
