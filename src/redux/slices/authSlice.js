import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  onboard: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOnboard: (state, action) => {
      state.onboard = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;
export default authReducer;
