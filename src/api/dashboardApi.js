import http from "http/http";
import { getRequest } from "http/request";
import { DASHBOARD } from "utils/endpoints";
import { addQueryParams } from "utils/helpers";

const getActiveTask = async () => {
  const requestUrl = addQueryParams(DASHBOARD.getActiveTask);

  const response = await http({
    method: "GET",
    url: DASHBOARD.getActiveTask,
  });
  return response;
};

const getCompletedTask = async () => {
  const requestUrl = addQueryParams(DASHBOARD.getCompletedTask);

  const response = await http({
    method: "GET",
    url: DASHBOARD.getCompletedTask,
  });
  return response;
};

const getActiveAndCompletedTaskByFilter = async (body) => {
  const { sort, orderBy, id, page, size } = body;
  const requestUrl = addQueryParams(
    DASHBOARD.getActiveAndCompletedTaskByFilter,
    {
      sort,
      orderBy,
      id,
      page,
      size,
    }
  );

  const response = await http({
    method: "POST",
    url: DASHBOARD.getActiveAndCompletedTaskByFilter(
      body.sort,
      body.orderBy,
      body.id,
      body.page,
      body.size
    ),
    data: body.data,
  });
  return response;
};

const getDashboardMetrics = async () => {
  const requestUrl = addQueryParams(DASHBOARD.getRenewals, queries);

  const response = await http({
    method: "GET",
    url: DASHBOARD.getDashboardMetrics,
  });
  return response;
};

const getRenewals = async (queries) => {
  try {
    const requestUrl = addQueryParams(DASHBOARD.getRenewals, queries);
    const response = await getRequest(requestUrl);
    return response;
  } catch (error) {
    console.error("Error fetching community managers:", error);
    throw error;
  }
};

export const dashboardApi = {
  getActiveTask,
  getCompletedTask,
  getActiveAndCompletedTaskByFilter,
  getDashboardMetrics,
  getRenewals,
};
