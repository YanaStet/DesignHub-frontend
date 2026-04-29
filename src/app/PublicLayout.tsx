import { DesignerProfileHooks } from "@/entities/designer-profile/hooks";
import { UserHooks } from "@/entities/users/hooks";
import { Header } from "@/features/Header";
import { Loader } from "@/shared/custom-ui/Loader";
import { HttpError } from "@/shared/api/api";
import { useMe } from "@/shared/store/meStore";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function PublicLayout() {
  const { data: me, error, isLoading } = UserHooks.useGetMeQuery();
  const { data: profile } = DesignerProfileHooks.useDesignerProfileQuery();
  const { setMe, setAvatarUrl, setDesignerProfile } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (me !== undefined && error === null) {
      setMe(me);
    }
    if (profile?.avatar) {
      setAvatarUrl(profile.avatar);
    }
    if (profile) {
      setDesignerProfile(profile);
    }
  }, [me, profile]);

  // Redirect to login only on 401 (Unauthorized), not on any error
  useEffect(() => {
    if (error && error instanceof HttpError && error.status === 401) {
      navigate(ROUTE_PATHS.LOGIN);
    }
  }, [error, navigate]);

  return (
    <div className="max-h-screen overflow-y-hidden">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="bg-primary-2 h-[calc(100dvh-64px)] custom-scrollbar-container overflow-y-auto">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}
