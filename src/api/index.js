import { dashboardApi } from "./dashboardApi";
import { loginApi } from "./loginApi";
import { onboardApi } from "./onboardApi";

export const api = {
  login: loginApi,
  onboard: onboardApi,
  dashboard: dashboardApi,
};
