import { commonApi } from "./common";
import { dashboardApi } from "./dashboardApi";
import { loginApi } from "./loginApi";
import { communityApi } from "./communityApi";

export const api = {
  login: loginApi,
  community: communityApi,
  common: commonApi,
  dashboard: dashboardApi,
};
