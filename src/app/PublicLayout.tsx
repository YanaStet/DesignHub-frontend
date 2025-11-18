import { Header } from "@/features/Header";
import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <>
      <Header />
      <div className="px-25 bg-primary-2 h-screen pt-26">
        <Outlet />
      </div>
    </>
  );
}
