import React, { FC, useCallback, useEffect, useState } from "react";
import { ReactComponent as GLogo } from "../../../assets/images/svg/google-logo.svg";
import { Button } from "reactstrap";
import { useTranslation } from "react-i18next";
import { TProps } from "../../_forms/SigInRegister/SigInRegister";
import { useAppDispatch } from "../../../redux/hooks";
import { signInWithGoogle } from "../../../redux/auth/authOperations";

const GoogleSignInBtn: FC<TProps> = ({ pageType }) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const { t } = useTranslation();

  const onClick = useCallback(() => {
    dispatch(signInWithGoogle());
  }, [dispatch]);

  useEffect(() => {
    if (pageType === "sign-in") setText(t("signInPage.signInWithGoogle"));
    if (pageType === "register") setText(t("registerPage.registerWithGoogle"));
  }, [pageType, t]);

  return (
    <Button
      type={"button"}
      onClick={onClick}
      color={"light"}
      className="border"
      block
    >
      <GLogo /> {text}
    </Button>
  );
};

export default GoogleSignInBtn;
