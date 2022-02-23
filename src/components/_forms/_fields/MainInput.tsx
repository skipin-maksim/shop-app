import React, { FC } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  register: object;
  errorType: { type: string } | undefined;
  type: string;
  placeholder: string;
}

const MainInput: FC<IProps> = ({ register, errorType, type, placeholder }) => {
  const { t } = useTranslation();

  return (
    <div className={"main-input-group mb-5"}>
      <input
        type={type}
        className={"main-input"}
        placeholder={placeholder}
        // @ts-ignore
        {...register}
      />

      <p className={"main-input-error"}>
        {errorType?.type === "required" &&
          t("common.formMessages.requiredField")}

        {errorType?.type === "minLength" &&
          t("common.formMessages.minLengthPassword")}

        {errorType?.type === "matches" && t("common.formMessages.matches")}
      </p>
    </div>
  );
};

export default MainInput;
