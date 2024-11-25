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

export const dashboardApi = { getActiveTask, getCompletedTask };
