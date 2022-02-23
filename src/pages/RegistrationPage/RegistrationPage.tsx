import React, { FC, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import {
  getStoreUser,
  getStoreUserAuthenticated,
} from "../../redux/auth/authSelectors";
import MetaTags from "react-meta-tags";
import { Container } from "reactstrap";
import s from "../SignInPage/signInPage.module.scss";
import { useTranslation } from "react-i18next";
import RegistrationPageNextStep from "./RegistrationPageNextStep";
import RegisterForm from "../../components/_forms/SigInRegister/RegisterForm";

const RegistrationPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);
  const storeUser = useAppSelector(getStoreUser);

  const isGoogleUserAndNotNumber = useMemo(
    () =>
      storeUser &&
      storeUser?.providerId === "google.com" &&
      !storeUser?.phoneNumber,
    [storeUser]
  );

  useEffect(() => {
    // @ts-ignore
    const fromPage = location.state ? location.state?.from?.pathname : "/";

    isAuthenticated &&
      !isGoogleUserAndNotNumber &&
      navigate(fromPage, { replace: true });
  }, [isAuthenticated, isGoogleUserAndNotNumber, location.state, navigate]);

  return (
    <div>
      <MetaTags>
        <title>{`Shop App | Registration`}</title>
      </MetaTags>

      <Container>
        <div className={`auto-bg ${s.form_wrp}`}>
          <h2 className={"mb-4 text-center"}>{t("registerPage.register")}</h2>

          {/*<RegistrationPageNextStep />*/}
          {isGoogleUserAndNotNumber && <RegistrationPageNextStep />}
          {!isGoogleUserAndNotNumber && <RegisterForm />}
        </div>
      </Container>
    </div>
  );
};

export default RegistrationPage;
