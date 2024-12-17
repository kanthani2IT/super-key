const LOGIN = {
  userLogin: "api/auth/login",
  requestReset: (email) => `/api/auth/request-reset?email=${email}`,
  resetPassword: "/api/auth/resetPassword",
  newPassword: "/api/auth/setNewPassword",
  enableMailChecking: (email) => `/api/auth/email?email=${email}`,
};

const COMMUNITY = {
  getAll: "/api/community",
  createCommunity: "/api/community/createWithFile",
  getAllCommunityList: "/api/community/pagings",
  getCommunityList: (page, size, sortBy, orderBy, status, search) =>
    `/api/community/pagings?page=${page}&size=${size}&sortBy=${sortBy}&direction=${orderBy}&status=${status}&name=${search}`,
  getUsers: "/api/veruna/users",
  getCommunityById: (id) => `/api/community/${id}`,
  updateCommunityById: (id) => `/api/community/update/${id}`,
  deleteCommunityById: (id) => `/api/community/${id}`,
  offBoardCommunity: `/api/community/offboardingCommunities`,
};
const COMMON = {
  getAllLocation: `api/googlemap/autocomplete`,
  getAllCommunity: `/api/community`,
  getAllCommunityManager: `/api/manager`,
  getAllPropertyManager: `/api/property-managers/all`,
  getAllDocTypes: `/api/document-types`,
  getUsers: "/api/veruna/users",
  getPriority: "/api/tasks/priority",
};
const TASK = {
  getStatus: "/api/tasks/status",
  getType: "/api/tasks/types",
  getPriority: "/api/tasks/priority",
  getContacts: "/api/tasks/contacts",
  createTask: "/api/tasks",
};
const DASHBOARD = {
  getActiveTask: "/api/tasks",
  getCompletedTask: "api/tasks/history",
  getActiveAndCompletedTaskByFilter: (sort, orderBy, id, page, size) =>
    `/api/tasks/community/CMCID?sort=${sort}&orderBy=${orderBy}&page=${page}&size=${size}`,
  //`api/tasks/community/0017x00000kF1kTAAS?sort=createdAt&orderBy=desc&page=1&size=30`,
  getDashboardMetrics: () => `/api/dashboard/metrics/CMCID`,
  getRenewals: `/api/dashboard/renewal/001bn00001CitW2AAJ`,
};

export { COMMON, COMMUNITY, DASHBOARD, LOGIN, TASK };
