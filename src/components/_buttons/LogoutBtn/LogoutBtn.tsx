import React, { FC, useCallback } from "react";
import { Button } from "reactstrap";
import { logoutUserInFirebase } from "../../../redux/auth/authOperations";
import { useAppDispatch } from "../../../redux/hooks";
import { useTranslation } from "react-i18next";

const LogoutBtn: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onLogout = useCallback(() => {
    dispatch(logoutUserInFirebase());
  }, [dispatch]);

  return (
    <Button color="primary" onClick={onLogout}>
      {t("common.logout")}
    </Button>
  );
};

export default LogoutBtn;
