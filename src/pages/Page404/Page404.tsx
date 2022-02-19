import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { getStoreUserAuthenticated } from "../../redux/auth/authSelectors";

const Page404: FC = () => {
  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);

  return (
    <div>
      <h2>Error 404 </h2>
      <h2>Page no found</h2>
      <Link to={isAuthenticated ? "/" : "/sign-in"}>To APP</Link>
    </div>
  );
};

export default Page404;
