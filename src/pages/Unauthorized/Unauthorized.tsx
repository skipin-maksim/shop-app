import React, { FC } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";
import {
  getStoreUser,
  getStoreUserAuthenticated,
} from "../../redux/auth/authSelectors";

const Unauthorized: FC = () => {
  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);
  const storeUser = useAppSelector(getStoreUser);

  const text1 =
    "Вы не авторизированны. Пожалуйста войдите, что бы пользоваться приложением.";
  const text2 =
    "Вы авторизированны. Но администратор не подтвердил ваш аккаунт. Подождите или обратитесь к администратору.";

  return (
    <div className="App-header">
      <h2>
        {isAuthenticated && storeUser && !storeUser.approved && text2}
        {!isAuthenticated && text1}
      </h2>
      <br />
      {!isAuthenticated && <Link to={"/sign-in"}>To sign in</Link>}
    </div>
  );
};

export default Unauthorized;
