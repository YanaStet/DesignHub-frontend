import { Header } from "@/features/Header";
import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div className="max-h-screen overflow-y-hidden">
      <Header />
      <div className="px-15 py-10 bg-primary-2 h-[calc(100dvh-64px)] custom-scrollbar-container overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
