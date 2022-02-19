import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getStoreUser,
  getStoreUserAuthenticated,
} from "../redux/auth/authSelectors";
import { checkUserSignIn } from "../redux/auth/authOperations";

/**
 * Check user sign in
 *
 */
const useAuth = () => {
  const dispatch = useAppDispatch();

  const isAut = useAppSelector(getStoreUserAuthenticated);
  const storeUser = useAppSelector(getStoreUser);

  const [authUserStatus, setAuthUserStatus] = useState(false);

  // todo Реализовать создание пользователя в firebase и заменить этот код на получаемый тип пользователя
  const role = "client"; // testing

  const onCheckAuthUser = useCallback(() => {
    dispatch(checkUserSignIn(setAuthUserStatus));
  }, [dispatch]);

  useEffect(() => {
    onCheckAuthUser();
  }, [onCheckAuthUser]);

  return { storeUser, isAut, authUserStatus, role };
};

export default useAuth;
