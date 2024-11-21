import http from "http/http";

const getRequest = (url, config = {}) => {
  return http.get(url, config);
};

const postRequest = (url, data, config = {}) => {
  return http.post(url, data, config);
};

const putRequest = (url, data, config = {}) => {
  return http.put(url, data, config);
};

const deleteRequest = (url, config = {}) => {
  return http.delete(url, config);
};

export { getRequest, postRequest, putRequest, deleteRequest };
