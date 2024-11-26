const LOGIN = {
  getUser: "todos",
  userLogin: "api/auth/login",
  requestReset: (email) => `/api/auth/request-reset?email=${email}`,
  resetPassword: "/api/auth/resetPassword",
  newPassword: "/api/auth/setNewPassword",
  enableMailChecking: (email) => `/api/auth/email?email=${email}`,
};
const ONBOARD = {
  getUsers: "/api/veruna/users",
};
const COMMUNITY = {
  getAll: "/api/community",
};
const COMMON = {
  getAllLocation: (type) => `/api/autocomplete?input=${type}`,
};

const DASHBOARD = {
  getActiveTask: "/api/tasks",
  getCompletedTask: "api/tasks/history",
  getActiveAndCompletedTaskByFilter: (sort, orderBy) =>
    `api/tasks/filters?sort=${sort}&orderBy=${orderBy}`,
};

export { COMMON, COMMUNITY, DASHBOARD, LOGIN, ONBOARD };
