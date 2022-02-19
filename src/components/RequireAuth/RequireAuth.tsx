import React, { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { getStoreUserAuthenticated } from "../../redux/auth/authSelectors";
import { userTypesArray } from "../../common/constants/userTypes";

interface IProps {
  allowedUserRoles: string[];
}

const RequireAuth: FC<IProps> = ({ allowedUserRoles }) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);
  const role = "client";

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  const isUserAllowed = userTypesArray.filter((type) =>
    allowedUserRoles.includes(type)
  );

  if (isUserAllowed.includes(role) && isAuthenticated) {
    return <Outlet />;
  }
  if (!isUserAllowed.includes(role) && isAuthenticated) {
    // return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default RequireAuth;
