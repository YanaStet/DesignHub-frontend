import { Header } from "@/features/Header";
import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <>
      <Header />
      <div className="px-25 pt-26 pb-10 bg-primary-2 min-h-screen custom-scrollbar-container overflow-y-scroll">
        <Outlet />
      </div>
    </>
  );
}
