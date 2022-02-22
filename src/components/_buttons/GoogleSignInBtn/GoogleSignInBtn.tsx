import React, { FC, useEffect, useState } from "react";
import { signInWithGoogle } from "../../../api/api.functions";
import { ReactComponent as GLogo } from "../../../assets/images/svg/google-logo.svg";
import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { TProps } from "../../_forms/SigInRegister/SigInRegister";

const GoogleSignInBtn: FC<TProps> = ({ pageType }) => {
  const [text, setText] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (pageType === "sign-in") setText(t("signInPage.signInWithGoogle"));
    if (pageType === "register") setText(t("registerPage.registerWithGoogle"));
  }, [pageType, t]);

  return (
    <Button
      type={"button"}
      onClick={signInWithGoogle}
      color={"light"}
      className="border"
      block
    >
      <GLogo /> {text}
    </Button>
  );
};

export default GoogleSignInBtn;
