import { RootState } from "../store";

export const getStoreUser = (state: RootState) => state.auth.user;
export const getStoreUserAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const getStoreAuthLoading = (state: RootState) => state.auth.loading;
export const getStoreAuthError = (state: RootState) => state.auth.error;
