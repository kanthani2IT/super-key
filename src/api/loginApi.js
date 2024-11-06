import http from "http/http";
import { LOGIN } from "utils/endpoints";

const getUserData = async ({ queryKey }) => {
  console.log(queryKey);

  const reponse = await http({
    method: "GET",
    url: LOGIN.getUser,
  });
  return reponse;
};

const userLogin = async (credentialData) => {
  const reponse = await http({
    method: "POST",
    url: LOGIN.userLogin,
    data:credentialData,
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
    data:resetData,
  });
  return reponse;
};
const newPassword = async (newPasswordData) => {
  const reponse = await http({
    method: "POST",
    url: LOGIN.newPassword,
    data:newPasswordData,
  });
  return reponse;
};

export const loginApi = { getUserData,userLogin,newPassword,resetPassword,requestReset };
