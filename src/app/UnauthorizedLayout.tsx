import { Outlet } from "react-router-dom";

export function UnauthorizedLayout() {
  return (
    <div className="px-15 py-10 bg-primary-2 h-dvh custom-scrollbar-container overflow-y-auto">
      <Outlet />
    </div>
  );
}
