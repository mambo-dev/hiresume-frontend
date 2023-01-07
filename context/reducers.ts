export function user(state: any, action: any) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export function job(state: any, action: any) {
  switch (action.type) {
    case "CREATED_JOB":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
