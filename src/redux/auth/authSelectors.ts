import { RootState } from "../store";

export const getStoreUser = (state: RootState) => state.auth.user;
export const getStoreAuthLoading = (state: RootState) => state.auth.loading;
export const getStoreAuthError = (state: RootState) => state.auth.error;
