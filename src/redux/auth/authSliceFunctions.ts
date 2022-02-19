import { IAuthStore } from "../types/authTypes";

export const onPending = (state: IAuthStore) => {
  state.loading = true;
};

export const onSignInFulfilled = (state: IAuthStore, payload: any) => {
  state.loading = false;
  state.user = payload;
  state.error = null;
  state.isAuthenticated = true;
};

export const onRejected = (state: IAuthStore, payload: any) => {
  state.loading = false;
  state.error = payload;
  state.isAuthenticated = false;
};
