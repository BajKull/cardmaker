const LoginScreen = (state = null, action) => {
  switch (action.type) {
    case "CHANGE_SCREEN_LOGIN":
      return action.payload;
    default:
      return state;
  }
};

export default LoginScreen;
