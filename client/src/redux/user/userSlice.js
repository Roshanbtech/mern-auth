import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      loginStart: (state) => {
        state.loading = true;
        state.error = false;  // Reset error on login start
      },
      loginSuccess: (state, action) => {
        state.loading = false;
        state.error = false;  // Reset error on success
        state.currentUser = action.payload;
      },
      loginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;  // Set error message
      },
      logout: (state) => {
        state.currentUser = null;
      },
    },
  });
  
  export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
  export default userSlice.reducer;
  

