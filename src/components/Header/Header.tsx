import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import {
  getStoreUser,
  getStoreUserAuthenticated,
} from "../../redux/auth/authSelectors";
import LogoutBtn from "../_buttons/LogoutBtn/LogoutBtn";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import { Container } from "reactstrap";
import { ReactComponent as Logo } from "../../assets/images/svg/logo.svg";

import s from "./header.module.scss";

const Header: FC = () => {
  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);
  const storeUser = useAppSelector(getStoreUser);

  return (
    <header id={"header"} className={`auto-bg py-2 ${s.header}`}>
      <Container>
        <div className={"d-flex align-items-center justify-content-between"}>
          <Link to={"/"} className={"text-decoration-none"}>
            <h1 className={"d-flex align-items-center m-0"}>
              <Logo width={30} className={"me-2"} />
              Shop App
            </h1>
          </Link>
          <LanguageDropdown />
        </div>

        {storeUser && storeUser?.photoURL && (
          <img src={storeUser.photoURL} alt="avatar" />
        )}

        {isAuthenticated && (
          <>
            <Link to={"/owner/dashboard"}>To /OWNER dashboard</Link>
            <br />
            <Link to={"/client/dashboard"}>To /CLIENT dashboard</Link>
            <br />
            <Link to={"/"}>To /</Link>
            <br />
            <LogoutBtn />
          </>
        )}
      </Container>
    </header>
  );
};

export default Header;
