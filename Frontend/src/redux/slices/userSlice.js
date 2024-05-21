// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  setUserDetailsReducer,
  clearUserDetailsReducer,
} from "../reducers/userReducer";

const initialState = {
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: setUserDetailsReducer,
    clearUserDetails: clearUserDetailsReducer,
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserDetails, clearUserDetails, setError } = userSlice.actions;

export default userSlice.reducer;
