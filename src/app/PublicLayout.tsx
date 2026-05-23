import { UserHooks } from "@/entities/users/hooks";
import { Header } from "@/features/Header";
import { Loader } from "@/shared/custom-ui/Loader";
import { useMe } from "@/shared/store/meStore";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function PublicLayout() {
  const { data: me, error, isLoading } = UserHooks.useGetMeQuery();
  const { setMe, setAvatarUrl, setDesignerProfile } = useMe();

  useEffect(() => {
    if (me !== undefined && error === null) {
      setMe(me);
      if (me?.profile) {
        setDesignerProfile(me.profile);
        setAvatarUrl(me.profile.avatar || undefined);
      } else {
        setDesignerProfile(null);
        setAvatarUrl(undefined);
      }
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
