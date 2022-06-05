import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";
import {
  getStoreUser,
  getStoreUserAuthenticated,
} from "../../redux/auth/authSelectors";

const Unauthorized: FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);
  const storeUser = useAppSelector(getStoreUser);

  const text1 =
    "Вы не авторизированны. Пожалуйста войдите, что бы пользоваться приложением.";
  const text2 =
    "Вы авторизированны. Но администратор не подтвердил ваш аккаунт. Подождите или обратитесь к администратору.";

  useEffect(() => {
    if (isAuthenticated && storeUser && storeUser.approved) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate, storeUser]);

  return (
    <div>
      <h2>
        {isAuthenticated && storeUser && !storeUser.approved && text2}
        {!isAuthenticated && text1}
      </h2>
      <br />
      {!isAuthenticated && <Link to={"/sign-in"}>To sign in</Link>}
      <br />
    </div>
  );
};

export default Unauthorized;
