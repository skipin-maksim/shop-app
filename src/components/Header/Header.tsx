import React, { FC, useCallback } from "react";
import { logoutUserInFirebase } from "../../redux/auth/authOperations";
import { ReactComponent as GLogo } from "../../assets/images/svg/google-logo.svg";
import { Button } from "reactstrap";
import { switchTheme } from "../../helpers/layoutHelpers";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getStoreUser,
  getStoreUserAuthenticated,
} from "../../redux/auth/authSelectors";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);
  const storeUser = useAppSelector(getStoreUser);
  // photoURL

  const onLogout = useCallback(() => {
    dispatch(logoutUserInFirebase());
  }, [dispatch]);

  return (
    <header className="App-header">
      <h2>
        Header <GLogo />
      </h2>

      <br />
      <Button onClick={switchTheme}>Switch theme</Button>
      {storeUser && storeUser?.photoURL && (
        <img src={storeUser.photoURL} alt="avatar" />
      )}

      <br />

      {isAuthenticated && (
        <>
          <Link to={"/sign-in"}>To sign in</Link>
          <br />
          <Link to={"/owner/dashboard"}>To /OWNER dashboard</Link>
          <br />
          <Link to={"/client/dashboard"}>To /CLIENT dashboard</Link>
          <br />
          <Link to={"/"}>To /</Link>
          <br />
          <Button color="primary" onClick={onLogout}>
            Logout
          </Button>
        </>
      )}
    </header>
  );
};

export default Header;
