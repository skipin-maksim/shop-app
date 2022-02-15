import { createSlice } from "@reduxjs/toolkit";
import { signInWithGoogle } from "./authOperations";
import { onPending, onRejected, onSignInFulfilled } from "./authSliceFunctions";
import { IAuthStore } from "../types/authTypes";

const initialState: IAuthStore = {
  user: null,
  loading: false,
  error: null,
};

const { reducer, actions } = createSlice({
  name: "AUTH",
  initialState,
  reducers: {
    checkSignInRequest: (state) => {
      onPending(state);
    },
    checkSignInSuccess: (state, { payload }) => {
      onSignInFulfilled(state, payload);
    },
    checkSignInError: (state, { payload }) => {
      onRejected(state, payload);
    },

    logoutRequest: (state) => {
      onPending(state);
    },
    logoutSuccess: () => {
      return initialState;
    },
    logoutError: (state, { payload }) => {
      onRejected(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        onPending(state);
      })
      .addCase(signInWithGoogle.fulfilled, (state, { payload }: any) => {
        onSignInFulfilled(state, payload);
      })
      .addCase(signInWithGoogle.rejected, (state, { payload }: any) => {
        onRejected(state, payload);
      });
  },
});

export const {
  checkSignInRequest,
  checkSignInSuccess,
  checkSignInError,

  logoutRequest,
  logoutSuccess,
  logoutError,
} = actions;

export default reducer;
