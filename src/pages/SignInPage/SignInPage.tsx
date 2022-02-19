import MetaTags from "react-meta-tags";
import React, { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getStoreUser,
  getStoreUserAuthenticated,
} from "../../redux/auth/authSelectors";
import { signInWithGoogle } from "../../redux/auth/authOperations";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { ReactComponent as GLogo } from "../../assets/images/svg/google-logo.svg";

const SignInPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);
  const storeUser = useAppSelector(getStoreUser);
  console.log(storeUser);

  const onGoogleSignIn = useCallback(() => {
    dispatch(signInWithGoogle());
  }, [dispatch]);

  // @ts-ignore
  const fromPage = location.state ? location.state?.from?.pathname : "/";

  useEffect(() => {
    isAuthenticated && navigate(fromPage, { replace: true });
  }, [fromPage, isAuthenticated, navigate]);

  return (
    <div>
      <MetaTags>
        <title>{`Shop App | Sign In`}</title>
      </MetaTags>

      <Container>
        <h1>SignInPage</h1>

        <Button onClick={onGoogleSignIn} color={"light"} className="border">
          <GLogo /> Войти с помощью Google
        </Button>
      </Container>
    </div>
  );
};

export default SignInPage;
