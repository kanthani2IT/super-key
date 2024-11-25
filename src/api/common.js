import { getRequest } from "http/request";
import { COMMON } from "utils/endpoints";
import { addQueryParams } from "utils/helpers";

const getAllLocation = async (queries) => {
  try {
    const requestUrl = addQueryParams(COMMON.getAllLocation, queries);
    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

const getAllCommunity = async (queries) => {
  try {
    console.log(queries);
    const requestUrl = addQueryParams(COMMON.getAllCommunity, queries);
    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching communities:", error);
    throw error;
  }
};

const getAllCommunityManager = async (queries) => {
  try {
    const requestUrl = addQueryParams(COMMON.getAllCommunityManager, queries);
    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching community managers:", error);
    throw error;
  }
};

const getAllPropertyManager = async (queries) => {
  try {
    const requestUrl = addQueryParams(COMMON.getAllPropertyManager, queries);
    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching property managers:", error);
    throw error;
  }
};

const getAllDocTypes = async (queries) => {
  try {
    const requestUrl = addQueryParams(COMMON.getAllDocTypes, queries);
    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching document types:", error);
    throw error;
  }
};

export const commonApi = {
  getAllLocation,
  getAllCommunity,
  getAllCommunityManager,
  getAllPropertyManager,
  getAllDocTypes,
};
