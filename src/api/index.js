import { commonApi } from "./common";
import { loginApi } from "./loginApi";
import { onboardApi } from "./onboardApi";

export const api = {
  login: loginApi,
  onboard: onboardApi,
  common: commonApi,
};
