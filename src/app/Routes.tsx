import {
  type RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthRedirectRoute } from "./AuthRedirectRoute";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { HomePageLazy } from "@/pages/home/Home.page.pazy";
import { PublicLayout } from "./PublicLayout";
import { WorkPageLazy } from "@/pages/work-page/Work.page.pazy";
import { UnauthorizedLayout } from "./UnauthorizedLayout";
import { LoginPageLazy } from "@/pages/login/Login.page.lazy";
import { MyProfilePageLazy } from "@/pages/my-profile/MyProfile.page.lazy";
import { DesignerProfilePageLazy } from "@/pages/designer-profile/DesignerProfile.page.pazy";
import { AdminPageLazy } from "@/pages/admin-page/Admin.page.pazy";

const routes: RouteObject[] = [
  {},
  {
    element: <AuthRedirectRoute />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: ROUTE_PATHS.HOME,
            element: <HomePageLazy />,
          },
          {
            path: ROUTE_PATHS.WORK_PAGE,
            element: <WorkPageLazy />,
          },
          {
            path: ROUTE_PATHS.USER_PROFILE,
            element: <DesignerProfilePageLazy />,
          },
          {
            path: ROUTE_PATHS.PROFILE,
            element: <MyProfilePageLazy />,
          },
          {
            path: ROUTE_PATHS.ADMIN,
            element: <AdminPageLazy />,
          }
        ],
      },
    ],
  },
  {
    element: <UnauthorizedLayout />,
    children: [
      {
        element: <LoginPageLazy />,
        path: ROUTE_PATHS.LOGIN,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export const Routes = () => <RouterProvider router={router} />;
