import { getRequest, postRequest } from "http/request";
import { TASK } from "utils/endpoints";
import { addQueryParams } from "utils/helpers";

const getAllStatus = async (queries) => {
  try {
    const requestUrl = addQueryParams(TASK.getStatus, queries);
    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching all status", error);
    throw error;
  }
};

const getAllTypes = async (queries) => {
  try {
    const requestUrl = addQueryParams(TASK.getType, queries);
    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching all types", error);
    throw error;
  }
};
const getAllPriorities = async (queries) => {
  try {
    const requestUrl = addQueryParams(TASK.getPriority, queries);
    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching all priorities", error);
    throw error;
  }
};
const getAllContacts = async (queries) => {
  try {
    const requestUrl = addQueryParams(TASK.getContacts, queries);
    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching all contacts", error);
    throw error;
  }
};

const createTask = async (payload) => {
  try {
    const response = await postRequest(TASK.createTask, payload);
    return response;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

export const taskApi = {
  getAllStatus,
  getAllTypes,
  getAllPriorities,
  getAllContacts,
  createTask,
};
