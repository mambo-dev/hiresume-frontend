const initialState = {
  user: {},
  loading: true,
  isLoggedIn: false,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "signup":
      return {
        ...state,
        user: action.payload,
        loading: false,
        isLoggedIn: false,
      };
    case "login":
      return {
        ...state,
        user: { ...action.payload },
        loading: false,
        isLoggedIn: true,
      };

    default:
      return state;
  }
};

export default authReducer;
