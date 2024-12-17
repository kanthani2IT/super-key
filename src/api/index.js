import { commonApi } from "./common";
import { communityApi } from "./communityApi";
import { dashboardApi } from "./dashboardApi";
import { loginApi } from "./loginApi";
import { taskApi } from "./taskApi";

export const api = {
  login: loginApi,
  community: communityApi,
  common: commonApi,
  dashboard: dashboardApi,
  task: taskApi,
};
