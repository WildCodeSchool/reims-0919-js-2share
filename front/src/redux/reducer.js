const initialState = {
  token: null
};

export const storeToken = token => ({
  type: "STORE_TOKEN",
  payload: token
});

const authWithTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_TOKEN":
      return { ...state, token: `Bearer ${action.payload}` };
    default:
      return state;
  }
};

export default authWithTokenReducer;
