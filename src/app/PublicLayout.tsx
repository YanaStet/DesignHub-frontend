import { DesignerProfileHooks } from "@/entities/designer-profile/hooks";
import { UserHooks } from "@/entities/users/hooks";
import { Header } from "@/features/Header";
import { Loader } from "@/shared/custom-ui/Loader";
import { useMe } from "@/shared/store/meStore";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function PublicLayout() {
  const { data: me, error, isLoading } = UserHooks.useGetMeQuery();
  const { data: profile } = DesignerProfileHooks.useDesignerProfileQuery();
  const { setMe, setAvatarUrl } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (me !== undefined && error === null) {
      setMe(me);
    }
    if (profile?.avatar_url) {
      setAvatarUrl(profile.avatar_url);
    }
    if (!localStorage.getItem("access-token")) {
      navigate(ROUTE_PATHS.LOGIN);
    }
  }, [me]);

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
