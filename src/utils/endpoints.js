const LOGIN = {
  getUser: "todos",
  userLogin:"api/auth/login",
  requestReset:(email)=>`/api/auth/request-reset?email=${email}`,
  resetPassword:"/api/auth/resetPassword",
  newPassword:"/api/auth/setNewPassword"
};

export { LOGIN };
