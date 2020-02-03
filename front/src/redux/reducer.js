const initialState = {
  token: null
};

export const storeToken = token => ({
  type: "STORE_TOKEN",
  payload: token
});

export const forgetToken = () => ({
  type: "FORGET_TOKEN"
});

const authWithTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_TOKEN":
      return { ...state, token: `Bearer ${action.payload}` };
      case "FORGET_TOKEN":
        return { ...state, token: null };
      default:
      return state;
  }
};

export default authWithTokenReducer;
