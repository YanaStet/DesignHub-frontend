import { UserHooks } from "@/entities/users/hooks";
import { Header } from "@/features/Header";
import { useMe } from "@/shared/store/meStore";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function PublicLayout() {
  const { data: me, error } = UserHooks.useGetMeQuery();
  const { setMe } = useMe();

  useEffect(() => {
    if (me !== undefined && error === null) {
      setMe(me);
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
