import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useRedirectForRole = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAut, authUserStatus, role } = useAuth();

  useEffect(() => {
    if (authUserStatus && isAut && location.pathname === `/${role}`) {
      return navigate(`/${role}/dashboard`, { replace: true });
    }

    if (authUserStatus && isAut && location.pathname === "/") {
      return navigate(`/${role}/dashboard`, { replace: true });
    }

    if (!isAut && location.pathname === "/") {
      return navigate(`/sign-in`, { replace: true });
    }
  }, [isAut, authUserStatus, location, navigate, role]);

  return { isAut, authUserStatus, role };
};

export default useRedirectForRole;
