// reducers/userReducer.js

export const setUserDetailsReducer = (state, action) => {
  state.user = action.payload;
};

export const clearUserDetailsReducer = (state) => {
  state.user = null;
};

// other reducer logic and initial state if needed
