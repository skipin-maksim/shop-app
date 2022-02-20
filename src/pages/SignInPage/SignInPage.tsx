import MetaTags from "react-meta-tags";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getStoreAuthError,
  getStoreUser,
  getStoreUserAuthenticated,
} from "../../redux/auth/authSelectors";
import {
  logoutUserInFirebase,
  signInWithEmailPass,
} from "../../redux/auth/authOperations";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { ReactComponent as GLogo } from "../../assets/images/svg/google-logo.svg";
import { signInWithGoogle } from "../../api/api.functions";

const SignInPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);
  const storeUser = useAppSelector(getStoreUser);
  const storeAuthError = useAppSelector(getStoreAuthError);
  console.log(storeUser);

  const [userData, setUserData] = useState({ email: "", password: "" });

  // if (storeAuthError?.msg === "user not approved") {
  //   console.log("Открыть модалку, что пользователь не подтвержден");
  // }

  const onLogout = useCallback(() => {
    dispatch(logoutUserInFirebase());
  }, [dispatch]);

  const inputChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setUserData({ ...userData, [target.name]: target.value });
  };

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(userData);
    signInWithEmailPass(userData);
  };

  useEffect(() => {
    // @ts-ignore
    const fromPage = location.state ? location.state?.from?.pathname : "/";

    isAuthenticated && navigate(fromPage, { replace: true });
  }, [isAuthenticated, location.state, navigate]);

  return (
    <div>
      <MetaTags>
        <title>{`Shop App | Sign In`}</title>
      </MetaTags>

      <Container>
        <h1>SignInPage</h1>

        {storeAuthError?.msg}

        {storeUser && storeUser.providerId === "password" && (
          <div>Введите имя</div>
        )}

        <form onSubmit={submitHandle}>
          <input
            type="email"
            value={userData.email}
            name={"email"}
            onChange={inputChangeHandle}
          />
          <br />
          <input
            type="password"
            value={userData.password}
            name={"password"}
            onChange={inputChangeHandle}
          />
          <br />
          <Button type={"submit"} color={"secondary"} className="border">
            Войти
          </Button>
        </form>
        <br />
        <Link to={"/registration"}>Или зарегистрируйтесь</Link>
        <br />
        <Button onClick={signInWithGoogle} color={"light"} className="border">
          <GLogo /> Войти с помощью Google
        </Button>
        <br />
        <Button color="primary" onClick={onLogout}>
          Logout
        </Button>
      </Container>
    </div>
  );
};

export default SignInPage;
