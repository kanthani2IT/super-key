import { getRequest } from "http/request";
import { COMMON } from "utils/endpoints";

const getAllLocation = async ({ search }) => {
  const reponse = await getRequest(COMMON.getAllLocation(search));
  return reponse;
};

export const commonApi = { getAllLocation };
