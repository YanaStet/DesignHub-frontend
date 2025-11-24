import { DesignerProfileHooks } from "@/entities/designer-profile/hooks";
import { UserHooks } from "@/entities/users/hooks";
import { Header } from "@/features/Header";
import { useMe } from "@/shared/store/meStore";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function PublicLayout() {
  const { data: me, error } = UserHooks.useGetMeQuery();
  const { data: profile } = DesignerProfileHooks.useDesignerProfileQuery();
  const { setMe, setAvatarUrl } = useMe();

  useEffect(() => {
    if (me !== undefined && error === null) {
      setMe(me);
    }
    if (profile?.avatar_url) {
      setAvatarUrl(profile.avatar_url);
    }
  }, [me]);

  return (
    <div className="max-h-screen overflow-y-hidden">
      <Header />
      <div className="px-15 py-10 bg-primary-2 h-[calc(100dvh-64px)] custom-scrollbar-container overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
