import React, { FC } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import { useTranslation } from "react-i18next";

interface IProps {
  control: Control;
  errors: FieldErrors;
}

const PhoneNumber: FC<IProps> = ({ control, errors }) => {
  const { t } = useTranslation();

  return (
    <div className={"main-input-group mb-5"}>
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => <PhoneInput placeholder="+...." {...field} />}
      />
      <p className={"main-input-error"}>
        {errors.phoneNumber?.type === "required" &&
          t("common.formMessages.requiredField")}
      </p>
    </div>
  );
};

export default PhoneNumber;
