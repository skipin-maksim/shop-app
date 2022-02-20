import { User } from "firebase/auth";
import { IAuthStore, TCreateDataOfUserInfo } from "../types/authTypes";
import { ref, update } from "firebase/database";
import { db } from "../../api/firebase.config";
import { checkSignInError, checkSignInSuccess } from "./authSlice";

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

/**
 * Create new user from Firebase user.
 *
 * @param {object} user - Firebase user data
 * @param {string} role - Role user
 */
export const createDataOfUserInfo: TCreateDataOfUserInfo = (user, role) => {
  return {
    ...user.providerData[0],
    uid: user.uid,
    approved: false,
    role,
    metadata: {
      ...user.metadata,
    },
  };
};
