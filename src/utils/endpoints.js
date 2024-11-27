const LOGIN = {
  userLogin: "api/auth/login",
  requestReset: (email) => `/api/auth/request-reset?email=${email}`,
  resetPassword: "/api/auth/resetPassword",
  newPassword: "/api/auth/setNewPassword",
  enableMailChecking: (email) => `/api/auth/email?email=${email}`,
};
const ONBOARD = {
  getUsers: "/api/veruna/users",
  getUserById: (id) => `/api/community/${id}`,
};
const COMMUNITY = {
  getAll: "/api/community",
  createCommunity: "/api/community",
};
const COMMON = {
  getAllLocation: `/api/autocomplete?input=""`,
  getAllCommunity: `/api/community`,
  getAllCommunityManager: `/api/manager`,
  getAllPropertyManager: `/api/propertyManager`,
  getAllDocTypes: `/api/document-types`,
};

const DASHBOARD = {
  getActiveTask: "/api/tasks",
  getCompletedTask: "api/tasks/history",
  getActiveAndCompletedTaskByFilter: (sort, orderBy) =>
    `api/tasks/filters?sort=${sort}&orderBy=${orderBy}`,
};

export { COMMON, COMMUNITY, DASHBOARD, LOGIN, ONBOARD };
