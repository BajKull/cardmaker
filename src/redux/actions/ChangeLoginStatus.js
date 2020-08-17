export const ChangeLoginStatus = (user) => {
  return {
    type: "CHANGE_LOGIN_STATUS",
    payload: user,
  };
};
