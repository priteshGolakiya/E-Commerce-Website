// slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  token: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUserDetails: (state) => {
      state.user = null;
      state.error = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserDetails, clearUserDetails, setError } = userSlice.actions;

export default userSlice.reducer;
