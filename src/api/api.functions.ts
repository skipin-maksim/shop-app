import { child, get, ref, set, update } from "firebase/database";
import { db } from "./firebase.config";
import { createDataOfUserInfo } from "../redux/auth/authFunctions";
import {
  IReturnedUser,
  TCheckUserInFirebase,
  TCreateUserInFirebase,
  TGetUserByIDInFirebase,
} from "../redux/types/authTypes";

const dbRef = ref(db);

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
 * @param {object} customData
 */
export const createUserInFirebase: TCreateUserInFirebase = async (
  user,
  role,
  customData
) => {
  try {
    let newUserData = createDataOfUserInfo(user, role);

    if (customData) {
      newUserData = {
        ...newUserData,
        displayName: customData.firstName + " " + customData?.lastName,
        phoneNumber: customData.phoneNumber,
      };
    }

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
 * Update user by UID in Firebase.
 * @param {object} user - user in Firebase database
 */
export const updateUserInFirebase = async (user: IReturnedUser) => {
  try {
    const updates = {};
    // @ts-ignore
    updates[`users/${user.uid}`] = user;

    await update(ref(db), updates);
  } catch (e) {
    console.error(e);
  }
};
