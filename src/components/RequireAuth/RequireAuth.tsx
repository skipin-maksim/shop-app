import React, { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import {
  getStoreUser,
  getStoreUserAuthenticated,
} from "../../redux/auth/authSelectors";
import { userTypesArray } from "../../common/constants/userTypes";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage";

interface IProps {
  allowedUserRoles: string[];
}

const RequireAuth: FC<IProps> = ({ allowedUserRoles }) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);
  const storeUser = useAppSelector(getStoreUser);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  const isUserAllowed = userTypesArray.filter((type) =>
    allowedUserRoles.includes(type)
  );

  // @ts-ignore
  const currentRole = isUserAllowed.includes(storeUser?.role);

  const isUserMatchesCriteria =
    storeUser && currentRole && isAuthenticated && storeUser.approved;

  const isGoogleUser =
    storeUser &&
    !storeUser?.phoneNumber &&
    storeUser.providerId === "google.com";

  if (isGoogleUser) return <RegistrationPage />;

  if (isUserMatchesCriteria) return <Outlet />;

  if (!isUserMatchesCriteria)
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;

  if (!currentRole && isAuthenticated) {
    // return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default RequireAuth;
