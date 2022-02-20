import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../api/firebase.config";
import { AppThunk } from "../store";
import {
  checkSignInError,
  checkSignInRequest,
  checkSignInSuccess,
  logoutError,
  logoutRequest,
  logoutSuccess,
} from "./authSlice";
import { createDataOfUserInfo } from "./authFunctions";
import { TSetterCallback } from "../types/authTypes";
import {
  checkUserInFirebase,
  createUserInFirebase,
  existingUserUpdateInFirebase,
  getUserByIDInFirebase,
} from "../../api/api.functions";

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

export const registrationWithEmailPass = (data: any) => {
  console.log(data);
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((e) => {
      const errorCode = e.code;
      const errorMessage = e.message;
      console.log(e);
      // ..
    });
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
      const errorMessage = e.message;
      console.log(errorCode);
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
          const defaultRole = "client";

          if (!existingUser) {
            const createdUser = await createUserInFirebase(user, defaultRole);
            dispatch(checkSignInSuccess(createdUser));
          } else {
            if (existingUser) {
              await existingUserUpdateInFirebase(
                user,
                existingUser,
                defaultRole
              );

              dispatch(checkSignInSuccess(existingUser));
            } else {
              dispatch(checkSignInError({ msg: "user not approved" }));
            }
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
