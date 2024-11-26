import { getRequest } from "http/request";
import { COMMON } from "utils/endpoints";
import { addQueryParams } from "utils/helpers";

const getAllLocation = async ({ search }) => {
  const requestUrl = addQueryParams(COMMON.getAllLocation, { search });
  const response = await getRequest(requestUrl);
  return response;
};

const getAllCommunity = async ({ search }) => {
  const requestUrl = addQueryParams(COMMON.getAllCommunity, { search });
  const response = await getRequest(requestUrl);
  return response;
};

const getAllCommunityManager = async ({ search }) => {
  const requestUrl = addQueryParams(COMMON.getAllCommunityManager, { search });
  const response = await getRequest(requestUrl);
  return response;
};

const getAllPropertyManager = async ({ search }) => {
  const requestUrl = addQueryParams(COMMON.getAllPropertyManager, { search });
  const response = await getRequest(requestUrl);
  return response;
};

const getAllDocumentTypes = async ({ search }) => {
  const requestUrl = addQueryParams(COMMON.getAllDocTypes, { search });
  const response = await getRequest(requestUrl);
  return response;
};

export const commonApi = {
  getAllLocation,
  getAllCommunity,
  getAllCommunityManager,
  getAllPropertyManager,
  getAllDocumentTypes,
};
