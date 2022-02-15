import MetaTags from "react-meta-tags";
import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getStoreUser } from "../../redux/auth/authSelectors";
import {
  logoutUserInFirebase,
  signInWithGoogle,
} from "../../redux/auth/authOperations";

const SignInPage = () => {
  const dispatch = useAppDispatch();

  const storeUser = useAppSelector(getStoreUser);
  console.log(storeUser);

  const onGoogleSignIn = useCallback(() => {
    dispatch(signInWithGoogle());
  }, [dispatch]);

  const onLogout = useCallback(() => {
    dispatch(logoutUserInFirebase());
  }, [dispatch]);
  return (
    <div>
      <MetaTags>
        <title>{`Shop App | Sign In`}</title>
      </MetaTags>

      <button onClick={onGoogleSignIn}>Login</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default SignInPage;
