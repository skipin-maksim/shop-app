import React, { FC } from "react";
import s from "../../../pages/SignInPage/signInPage.module.scss";
import { useForm } from "react-hook-form";
import { Button } from "reactstrap";
import GoogleSignInBtn from "../../_buttons/GoogleSignInBtn/GoogleSignInBtn";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { registrationWithEmailPass } from "../../../redux/auth/authOperations";
import { useAppDispatch } from "../../../redux/hooks";
import PhoneNumber from "../_fields/PhoneNumber";
import { yupResolver } from "@hookform/resolvers/yup";
// @ts-ignore
import * as yup from "yup";
import MainInput from "../_fields/MainInput";

const schema = yup
  .object({
    phoneNumber: yup
      .string()
      .matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12,14}(\s*)?$/)
      .required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6)
      // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/)
      .required(),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  })
  .required();

export type TCurrentData = {
  btnText: (path: string) => string;
  linkText: (path: string) => string;
  redirectLink: string;
};

export type TSigInRegister = {
  email: string;
  password: string;
  repeatPassword: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};

const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSigInRegister>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(registrationWithEmailPass(data));
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

      <MainInput
        errorType={errors.repeatPassword}
        register={{ ...register("repeatPassword") }}
        type={"password"}
        placeholder={t("form.repeatPassword")}
      />

      <MainInput
        errorType={errors.firstName}
        register={{ ...register("firstName") }}
        type={"text"}
        placeholder={t("form.firstName")}
      />

      <MainInput
        errorType={errors.lastName}
        register={{ ...register("lastName") }}
        type={"text"}
        placeholder={t("form.lastName")}
      />

      {/*// @ts-ignore*/}
      <PhoneNumber control={control} errors={errors} />

      <Button
        block
        type={"submit"}
        color={"primary"}
        className={"mb-4 border-primary text"}
      >
        {t("registerPage.registerBtn")}
      </Button>

      <GoogleSignInBtn pageType={"register"} />

      <Link className={"d-block mt-3 text-center"} to={"/sign-in"}>
        {t("registerPage.orSignIn")}
      </Link>
    </form>
  );
};

export default RegisterForm;
