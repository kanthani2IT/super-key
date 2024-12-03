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
  getAllCommunityList: "/api/community/paging",
  getUsers: "/api/veruna/users",
  getCommunityById: (id) => `/api/community/update/${id}`,
  updateCommunityById: (id) => `/api/community/${id}`,
  deleteCommunityById: (id) => `/api/community/${id}`,
};
const COMMON = {
  getAllLocation: `/api/autocomplete`,
  getAllCommunity: `/api/community`,
  getAllCommunityManager: `/api/manager`,
  getAllPropertyManager: `/api/property-managers/all`,
  getAllDocTypes: `/api/document-types`,
};

const DASHBOARD = {
  getActiveTask: "/api/tasks",
  getCompletedTask: "api/tasks/history",
  getActiveAndCompletedTaskByFilter: (sort, orderBy) =>
    `/api/tasks/filters?sort=${sort}&orderBy=${orderBy}`,
  getDashboardMetrics: `/api/dashboard/metrics`,
};

export { COMMON, COMMUNITY, DASHBOARD, LOGIN };
