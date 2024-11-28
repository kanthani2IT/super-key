import http from "http/http";
import { DASHBOARD } from "utils/endpoints";

const getActiveTask = async () => {
  const response = await http({
    method: "GET",
    url: DASHBOARD.getActiveTask,
  });
  return response;
};

const getCompletedTask = async () => {
  const response = await http({
    method: "GET",
    url: DASHBOARD.getCompletedTask,
  });
  return response;
};

const getActiveAndCompletedTaskByFilter = async (body) => {
  const response = await http({
    method: "POST",
    url: DASHBOARD.getActiveAndCompletedTaskByFilter(body.sort, body.orderBy),
    data: body.data,
  });
  return response;
};

const getDashboardMetrics = async () => {
  const response = await http({
    method: "GET",
    url: DASHBOARD.getDashboardMetrics,
  });
  return response;
};

export const dashboardApi = {
  getActiveTask,
  getCompletedTask,
  getActiveAndCompletedTaskByFilter,
  getDashboardMetrics,
};
