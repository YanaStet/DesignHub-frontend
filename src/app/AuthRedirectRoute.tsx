import { UserHooks } from "@/entities/users/hooks";
import { HttpError } from "@/shared/api/api";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthRedirectRoute = () => {
  const { error } = UserHooks.useGetMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (error && error instanceof HttpError && error.status === 401) {
      navigate(ROUTE_PATHS.LOGIN);
    }
  }, [error, navigate]);

  return <Outlet />;
};
