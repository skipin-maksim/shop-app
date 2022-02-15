import {onAuthStateChanged, signInWithPopup, signOut, User,} from "firebase/auth";
import {auth, provider} from "../../api/firebase.config";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppThunk} from "../store";
import {
  checkSignInError,
  checkSignInRequest,
  checkSignInSuccess,
  logoutError,
  logoutRequest,
  logoutSuccess,
} from "./authSlice";

/**
 * Create new user from Firebase user.
 *
 * @param {object} user - Firebase user data
 */
const createDataOfUserInfo = (user: User) => {
  return {
    ...user.providerData[0],
    metadata: {
      ...user.metadata,
    },
  };
};

/**
 * Sign in with Google Provider
 */
export const signInWithGoogle = createAsyncThunk(
  "AUTH/signInWithGoogle",
  async () => {
    const result = await signInWithPopup(auth, provider);

    if (result) {
      return createDataOfUserInfo(result.user);
    }
  }
);

/**
 * Check is user sign in on Firebase
 */
export const checkUserSignIn = (): AppThunk => async (dispatch) => {
  dispatch(checkSignInRequest());
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const newUser = createDataOfUserInfo(user);
        dispatch(checkSignInSuccess(newUser));
      } else {
        dispatch(checkSignInError("no auth"));
      }
    });
  } catch (e) {
    dispatch(checkSignInError(e));
  }
};

/**
 * Logout user in Firebase
 */
export const logoutUserInFirebase = (): AppThunk => async (dispatch) => {
  dispatch(logoutRequest());

  signOut(auth)
    .then(() => {
      dispatch(logoutSuccess());
    })
    .catch((error) => {
      dispatch(logoutError("no auth"));
      console.log(error);
    });
};
