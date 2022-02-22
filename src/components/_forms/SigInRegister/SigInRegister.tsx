import React, { FC, useEffect, useState } from "react";
import s from "../../../pages/SignInPage/signInPage.module.scss";
import { useForm } from "react-hook-form";
import { Button } from "reactstrap";
import GoogleSignInBtn from "../../_buttons/GoogleSignInBtn/GoogleSignInBtn";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  registrationWithEmailPass,
  signInWithEmailPass,
} from "../../../redux/auth/authOperations";

export type TCurrentData = {
  btnText: (path: string) => string;
  linkText: (path: string) => string;
  redirectLink: string;
};

export type TSigInRegister = {
  email: string;
  password: string;
};

export type TProps = {
  pageType: "sign-in" | "register";
};

const SigInRegister: FC<TProps> = ({ pageType }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSigInRegister>();

  const [currentData, setCurrentData] = useState<TCurrentData>({
    btnText: t("registerPage.registerBtn"),
    linkText: t("registerPage.orSignIn"),
    redirectLink: "/sign-in",
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    if (pageType === "sign-in") {
      console.log("sign-in");
      signInWithEmailPass(data);
      return;
    }
    if (pageType === "register") {
      console.log("register");
      registrationWithEmailPass(data);
      return;
    }
  });

  useEffect(() => {
    if (pageType === "sign-in") {
      setCurrentData({
        btnText: t("signInPage.sigInBtn"),
        linkText: t("signInPage.orRegistration"),
        redirectLink: "/registration",
      });
    }
    if (pageType === "register") {
      setCurrentData({
        btnText: t("registerPage.registerBtn"),
        linkText: t("registerPage.orSignIn"),
        redirectLink: "/sign-in",
      });
    }
  }, [pageType, t]);

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <div className={"main-input-group mb-5"}>
        <input
          type={"email"}
          className={"main-input"}
          {...register("email", { required: true })}
        />
        <p className={"main-input-error"}>
          {errors.email?.type === "required" &&
            t("common.formMessages.requiredField")}
        </p>
      </div>

      <div className={"main-input-group mb-5"}>
        <input
          type={"password"}
          className={"main-input "}
          {...register("password", {
            required: true,
            // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
            minLength: 6,
          })}
        />
        <p className={"main-input-error"}>
          {errors.password?.type === "required" &&
            t("common.formMessages.requiredField")}
        </p>
        <p className={"main-input-error"}>
          {errors.password?.type === "minLength" &&
            t("common.formMessages.minLength")}
        </p>
      </div>

      <Button
        block
        type={"submit"}
        color={"primary"}
        className={"mb-4 border-primary text"}
      >
        {currentData.btnText}
      </Button>

      <GoogleSignInBtn pageType={pageType} />
      <Link
        className={"d-block mt-3 text-center"}
        to={currentData.redirectLink}
      >
        {currentData.linkText}
      </Link>
    </form>
  );
};

export default SigInRegister;
