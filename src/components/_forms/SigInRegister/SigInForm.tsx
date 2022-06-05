import React, { FC } from "react";
import s from "../../../pages/SignInPage/signInPage.module.scss";
import { useForm } from "react-hook-form";
import { Button } from "reactstrap";
import GoogleSignInBtn from "../../_buttons/GoogleSignInBtn/GoogleSignInBtn";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { signInWithEmailPass } from "../../../redux/auth/authOperations";
import { yupResolver } from "@hookform/resolvers/yup";
// @ts-ignore
import * as yup from "yup";
import MainInput from "../_fields/MainInput";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/)
      .required(),
  })
  .required();

export type TSigInRegister = {
  email: string;
  password: string;
};

const SigInForm: FC = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSigInRegister>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    signInWithEmailPass(data);
  });

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <MainInput
        errorType={errors.email}
        register={{ ...register("email") }}
        type={"email"}
        placeholder={t("form.email")}
      />

      <MainInput
        errorType={errors.password}
        register={{ ...register("password") }}
        type={"password"}
        placeholder={t("form.password")}
      />

      <Button
        block
        type={"submit"}
        color={"primary"}
        className={"mb-4 border-primary text"}
      >
        {t("signInPage.sigInBtn")}
      </Button>

      <GoogleSignInBtn pageType={"sign-in"} />

      <Link className={"d-block mt-3 text-center"} to={"/registration"}>
        {t("signInPage.orRegistration")}
      </Link>
    </form>
  );
};

export default SigInForm;
