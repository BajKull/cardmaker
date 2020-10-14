const LoginStatus = (state = null, action) => {
  switch (action.type) {
    case "CHANGE_LOGIN_STATUS":
      return action.payload;
    default:
      return state;
  }
};

export default LoginStatus;
