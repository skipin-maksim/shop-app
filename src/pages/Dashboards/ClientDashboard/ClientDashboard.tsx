import React, { FC } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getStoreUser } from "../../../redux/auth/authSelectors";
import { userTypes } from "../../../common/constants/userTypes";
import { Navigate } from "react-router-dom";

const ClientDashboard: FC = () => {
  const storeUser = useAppSelector(getStoreUser);

  if (storeUser?.role !== userTypes.CLIENT) {
    return <Navigate to={`${storeUser?.role}/dashboard`} replace />;
  }
  return (
    <div>
      <h1>Client Dashboard</h1>
    </div>
  );
};

export default ClientDashboard;
