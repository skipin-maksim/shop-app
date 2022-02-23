import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getStoreUser } from "../../redux/auth/authSelectors";
import { Button } from "reactstrap";
import s from "../SignInPage/signInPage.module.scss";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { updateUserInFirebase } from "../../api/api.functions";
import { setUpdatedUser } from "../../redux/auth/authSlice";
import { sendRegisterMsgToTelegram } from "../../api/api.tg.functions";

export type TRegister = {
  phoneNumber?: string;
};

const RegistrationPageNextStep: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>();

  const storeUser = useAppSelector(getStoreUser);

  const onSubmit = handleSubmit(async (data) => {
    const updatedUser = { ...storeUser, ...data };
    // @ts-ignore
    await updateUserInFirebase(updatedUser);

    dispatch(setUpdatedUser(updatedUser));

    await sendRegisterMsgToTelegram(updatedUser);
    navigate("/", { replace: true });
  });

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <div className={"main-input-group mb-5"}>
        <input
          type={"number"}
          className={"main-input"}
          placeholder={"Phone number"}
          {...register("phoneNumber", {
            required: true,

            minLength: 10,
          })}
        />
        <p className={"main-input-error"}>
          {errors.phoneNumber?.type === "required" &&
            t("common.formMessages.requiredField")}
        </p>
      </div>

      <Button
        block
        type={"submit"}
        color={"primary"}
        className={"mb-4 border-primary text"}
      >
        Добавить
      </Button>
    </form>
  );
};

export default RegistrationPageNextStep;
