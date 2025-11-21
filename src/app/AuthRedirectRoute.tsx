import { ROUTE_PATHS } from "@/shared/utils/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthRedirectRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("access-token")) {
      navigate(ROUTE_PATHS.LOGIN);
    }
  }, []);

  return <Outlet />;
};
