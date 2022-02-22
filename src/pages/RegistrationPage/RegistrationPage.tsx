import React, { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { getStoreUserAuthenticated } from "../../redux/auth/authSelectors";
import MetaTags from "react-meta-tags";
import { Container } from "reactstrap";
import SigInRegister from "../../components/_forms/SigInRegister/SigInRegister";
import s from "../SignInPage/signInPage.module.scss";
import { useTranslation } from "react-i18next";

const RegistrationPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);

  useEffect(() => {
    // @ts-ignore
    const fromPage = location.state ? location.state?.from?.pathname : "/";

    isAuthenticated && navigate(fromPage, { replace: true });
  }, [isAuthenticated, location.state, navigate]);
  return (
    <div id={"main-content"}>
      <MetaTags>
        <title>{`Shop App | Registration`}</title>
      </MetaTags>

      <Container>
        <div className={`auto-bg ${s.form_wrp}`}>
          <h2 className={"mb-4 text-center"}>{t("registerPage.register")}</h2>

          <SigInRegister pageType={"register"} />
        </div>
      </Container>
    </div>
  );
};

export default RegistrationPage;
