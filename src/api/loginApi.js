import http from "http/http";
import { LOGIN } from "utils/endpoints";

const userLogin = async (credentialData) => {
  const reponse = await http({
    method: "POST",
    url: LOGIN.userLogin,
    data: credentialData,
  });
  return reponse;
};

const requestReset = async (email) => {
  const reponse = await http({
    method: "POST",
    url: LOGIN.requestReset(email),
  });
  return reponse;
};

const resetPassword = async (resetData) => {
  const reponse = await http({
    method: "POST",
    url: LOGIN.resetPassword,
    data: resetData,
  });
  return reponse;
};

const newPassword = async (newPasswordData) => {
  const reponse = await http({
    method: "POST",
    url: LOGIN.newPassword,
    data: newPasswordData,
  });
  return reponse;
};

const isEmailEnabled = async (emailEnabled) => {
  const reponse = await http({
    method: "GET",
    url: LOGIN.enableMailChecking(emailEnabled),
  });
  return reponse;
};

export const loginApi = {
  userLogin,
  newPassword,
  resetPassword,
  requestReset,
  isEmailEnabled,
};
