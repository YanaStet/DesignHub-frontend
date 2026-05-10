import { useMe } from "@/shared/store/meStore";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { Navigate, Outlet } from "react-router-dom";

export function AdminRoute() {
  const { me } = useMe();

  if (!me) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  if (me.role === "user") {
    return <Navigate to={ROUTE_PATHS.HOME} replace />;
  }

  return <Outlet />;
}
