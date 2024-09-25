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
      updateUserStart: (state) => {
        state.loading = true;
      },
      updateUserSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = false;
      },
      updateUserFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
    },
  });
  
  export const { loginStart, loginSuccess, loginFailure, updateUserStart, updateUserSuccess, updateUserFailure } = userSlice.actions;
  export default userSlice.reducer;
  

