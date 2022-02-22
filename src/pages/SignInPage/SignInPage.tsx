import MetaTags from "react-meta-tags";
import React, { FC, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  // getStoreAuthError,
  getStoreUser,
  getStoreUserAuthenticated,
} from "../../redux/auth/authSelectors";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container } from "reactstrap";
import SigInRegister from "../../components/_forms/SigInRegister/SigInRegister";

import s from "./signInPage.module.scss";

const SignInPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);
  const storeUser = useAppSelector(getStoreUser);
  // const storeAuthError = useAppSelector(getStoreAuthError);
  console.log(storeUser);

  useEffect(() => {
    // @ts-ignore
    const fromPage = location.state ? location.state?.from?.pathname : "/";

    isAuthenticated && navigate(fromPage, { replace: true });
  }, [isAuthenticated, location.state, navigate]);

  // TODO Если user регистрируется через мыло и пароль, сделать окно ввода имени тд
  return (
    <div id={"main-content"}>
      <MetaTags>
        <title>{`Shop App | ${t("signInPage.sigIn")}`}</title>
      </MetaTags>

      <Container>
        {/*{storeAuthError?.msg}*/}

        {storeUser && storeUser.providerId === "password" && (
          <div>Введите имя</div>
        )}

        <div className={`auto-bg ${s.form_wrp}`}>
          <h2 className={"mb-4 text-center"}>{t("signInPage.sigIn")}</h2>

          <SigInRegister pageType={"sign-in"} />
        </div>
      </Container>
    </div>
  );
};

export default SignInPage;
