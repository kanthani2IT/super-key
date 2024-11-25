const LOGIN = {
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
  getAllLocation: `/api/address`,
  getAllCommunity: `/api/community/name`,
  getAllCommunityManager: `/api/communityManager`,
  getAllPropertyManager: `/api/propertyManager`,
  getAllDocTypes: `/api/document-types/names`,
};

export { LOGIN, ONBOARD, COMMON, COMMUNITY };
