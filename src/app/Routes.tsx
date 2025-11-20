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
            element: <div>User Profile Page</div>,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export const Routes = () => <RouterProvider router={router} />;
