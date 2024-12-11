import http from "http/http";
import { getRequest, postFormRequest, putRequest } from "http/request";
import { COMMUNITY } from "utils/endpoints";
import { addQueryParams } from "utils/helpers";

const getUsersData = async ({ queryKey }) => {
  const reponse = await http({
    method: "GET",
    url: COMMUNITY.getUsers,
  });
  return reponse;
};
const getCommunityById = async (id) => {
  try {
    const requestUrl = addQueryParams(COMMUNITY.getCommunityById(id));

    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};
const updateCommunityById = async (id, body) => {
  try {
    const requestUrl = COMMUNITY.updateCommunityById(id);

    const response = await putRequest(requestUrl, body);
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const createCommunity = async (payload) => {
  const reponse = await postFormRequest(COMMUNITY.createCommunity, payload);
  return reponse;
};

const deleteCommunityById = async (id, body) => {
  try {
    const requestUrl = addQueryParams(COMMUNITY.updateCommunityById(id));

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

const getCommunityList = async (body) => {
  const response = await http({
    method: "GET",
    url: COMMUNITY.getCommunityList(
      body.page,
      body.size,
      body.sortBy,
      body.orderBy,
      body.status,
      body.search
    ),
  });
  return response;
};

 const offboardCommunity = async (communityId, cmcId) => {
    const payload = {
      mappings: [
        {
          communityId,
          cmcId,
        },
      ],
    };
    const response = await putRequest(COMMUNITY.offboardCommunity, payload);
    return response.data;
  };

export const communityApi = {
  getUsersData,
  getCommunityById,
  updateCommunityById,
  deleteCommunityById,
  createCommunity,
  getAllCommunityList,
  getCommunityList,
  offboardCommunity,
};
