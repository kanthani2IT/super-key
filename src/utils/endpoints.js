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
  getUserById: (id) => `/api/community/:${id}`,
};
const COMMUNITY = {
  getAll: "/api/community",
};
const COMMON = {
  getAllLocation: (type) => `/api/autocomplete?input=${type}`,
};

export { COMMON, COMMUNITY, LOGIN, ONBOARD };
