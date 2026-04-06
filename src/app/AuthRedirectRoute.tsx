import { UserHooks } from "@/entities/users/hooks";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthRedirectRoute = () => {
  const { error } = UserHooks.useGetMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate(ROUTE_PATHS.LOGIN);
    }
  }, [error, navigate]);

  return <Outlet />;
};
