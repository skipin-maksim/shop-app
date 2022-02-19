import React, { FC } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../redux/hooks";
import { getStoreUserAuthenticated } from "../../redux/auth/authSelectors";

const Unauthorized: FC = () => {
  const isAuthenticated = useAppSelector(getStoreUserAuthenticated);

  return (
    <div className="App-header">
      <h2>
        {isAuthenticated ? "No required access" : "You are not authorized"}
      </h2>
      <br />
      {!isAuthenticated && <Link to={"/sign-in"}>To sign in</Link>}
    </div>
  );
};

export default Unauthorized;
