export const signup = (userData: any) => {
  return {
    type: "signup",
    payload: userData,
  };
};

export const login = (userData: any) => {
  return {
    type: "login",
    payload: {
      ...userData,
      isLoggedIn: false,
    },
  };
};
