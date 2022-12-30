const initialState = {
  user: "",
  loading: true,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "signup":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "login":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
