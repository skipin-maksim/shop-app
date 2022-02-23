import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getStoreUser } from "../../redux/auth/authSelectors";
import { Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { updateUserInFirebase } from "../../api/api.functions";
import { setUpdatedUser } from "../../redux/auth/authSlice";
import { sendRegisterMsgToTelegram } from "../../api/api.tg.functions";
import { yupResolver } from "@hookform/resolvers/yup";
// @ts-ignore
import * as yup from "yup";
import PhoneNumber from "../../components/_forms/_fields/PhoneNumber";

import s from "../SignInPage/signInPage.module.scss";

export type TRegister = {
  phoneNumber?: string;
};

const schema = yup
  .object({
    phoneNumber: yup
      .string()
      .matches(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12,14}(\s*)?$/)
      .required(),
  })
  .required();

const RegistrationPageNextStep: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: yupResolver(schema),
  });

  const storeUser = useAppSelector(getStoreUser);

  const onSubmit = handleSubmit(async (data) => {
    // if (!data.phoneNumber) return;
    const updatedUser = { ...storeUser, ...data };

    // @ts-ignore
    await updateUserInFirebase(updatedUser);

    dispatch(setUpdatedUser(updatedUser));

    await sendRegisterMsgToTelegram(updatedUser);
    navigate("/", { replace: true });
  });

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <PhoneNumber control={control} errors={errors} />

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
