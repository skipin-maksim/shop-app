import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../../api/firebase.config";
import { AppThunk } from "../store";
import {
  checkSignInError,
  checkSignInRequest,
  checkSignInSuccess,
  logoutError,
  logoutRequest,
  logoutSuccess,
} from "./authSlice";
import { TSetterCallback } from "../types/authTypes";
import {
  createUserInFirebase,
  getUserByIDInFirebase,
  updateUserInFirebase,
} from "../../api/api.functions";
import { sendRegisterMsgToTelegram } from "../../api/api.tg.functions";
import { createDataOfUserInfo } from "./authFunctions";

const defaultRole = "client";

/**
 * Logout user in Firebase
 */
export const logoutUserInFirebase = (): AppThunk => async (dispatch) => {
  dispatch(logoutRequest());

  signOut(auth)
    .then(() => {
      dispatch(logoutSuccess());
    })
    .catch((e) => {
      dispatch(logoutError("no auth"));
      console.log(e);
    });
};

/**
 * Sign in with Google Provider
 */
export const signInWithGoogle = (): AppThunk => async (dispatch) => {
  dispatch(checkSignInRequest());

  try {
    const { user } = await signInWithPopup(auth, provider);
    const createdUser = await createUserInFirebase(user, defaultRole);
    dispatch(checkSignInSuccess(createdUser));
  } catch (e) {
    console.error(e);
    dispatch(checkSignInError(e));
  }
};

export const registrationWithEmailPass =
  (data: any): AppThunk =>
  async (dispatch) => {
    dispatch(checkSignInRequest());

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log(user);

      const createdUser = await createUserInFirebase(user, defaultRole, data);

      dispatch(checkSignInSuccess(createdUser));
      await sendRegisterMsgToTelegram(createdUser);
    } catch (e) {
      console.error(e);
      dispatch(checkSignInError(e));
    }
  };

export const signInWithEmailPass = (data: any) => {
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((e) => {
      const errorCode = e.code;
      console.log(e, errorCode);
    });
};

/**
 * Check is user sign in on Firebase
 * @param {function} callback - setter. When we wait for any response to the user request,
 * we run a function to render routes
 */
export const checkUserSignIn =
  (callback: TSetterCallback): AppThunk =>
  async (dispatch) => {
    dispatch(checkSignInRequest());
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const existingUser = await getUserByIDInFirebase(user.uid);

          if (existingUser) {
            const newUserData = {
              ...createDataOfUserInfo(user, defaultRole),
              approved: existingUser.approved,
              role: existingUser.role,
              phoneNumber: existingUser?.phoneNumber,
            };

            await updateUserInFirebase(newUserData);

            dispatch(checkSignInSuccess(newUserData));
          } else {
            dispatch(checkSignInError({ msg: "user not approved" }));
          }

          callback(true);
        } else {
          dispatch(checkSignInError({ msg: "not authorized" }));
          callback(true);
        }
      });
    } catch (e) {
      dispatch(checkSignInError(e));
      callback(true);
    }
  };
