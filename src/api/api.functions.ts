import { child, get, ref, set, update } from "firebase/database";
import { auth, db, provider } from "./firebase.config";
import { createDataOfUserInfo } from "../redux/auth/authFunctions";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import {
  TCheckUserInFirebase,
  TCreateUserInFirebase,
  TExistingUserUpdateInFirebase,
  TGetUserByIDInFirebase,
} from "../redux/types/authTypes";

const dbRef = ref(db);

/**
 * Sign in with Google Provider
 */
export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, provider);
};

/**
 * Check is user exists in Firebase
 * @param {string} uid: - user UID in Firebase Auth
 */
export const checkUserInFirebase: TCheckUserInFirebase = async (uid) => {
  try {
    const userSnapshot = await get(child(dbRef, `users/${uid}`));
    return userSnapshot.exists();
  } catch (e) {
    console.error(e);
  }
};

/**
 * Create new user in Firebase if not exists. Returns him or null
 * @param {object} user: - user in Firebase Auth
 * @param {string} role - "client" | "admin" | "owner"
 */
export const createUserInFirebase: TCreateUserInFirebase = async (
  user,
  role
) => {
  try {
    const newUserData = createDataOfUserInfo(user, role);

    await set(ref(db, `users/${user.uid}`), newUserData);
    return newUserData;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * Get user by UID in Firebase. Returns him or null
 * @param {string} uid - user UID in Firebase Auth
 */
export const getUserByIDInFirebase: TGetUserByIDInFirebase = async (uid) => {
  try {
    const userSnapshot = await get(child(dbRef, `users/${uid}`));

    if (userSnapshot.exists()) {
      return userSnapshot.val();
    }

    return null;
  } catch (e) {
    console.error(e);
  }
};

/**
 * User update without touching the approved field
 * @param {object} user: - user in Firebase Auth
 * @param {object} existingUser - user in Firebase database users
 * @param {string} role - "client" | "admin" | "owner"
 */
export const existingUserUpdateInFirebase: TExistingUserUpdateInFirebase =
  async (user, existingUser, role) => {
    try {
      const updates = {};
      // @ts-ignore
      updates[`users/${user.uid}`] = {
        ...createDataOfUserInfo(user, role),
        approved: existingUser.approved,
        role: existingUser.role,
      };

      await update(ref(db), updates);
    } catch (e) {
      console.error(e);
    }
  };
