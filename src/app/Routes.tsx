import {
  type RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthRedirectRoute } from "./AuthRedirectRoute";
import { ROUTE_PATHS } from "@/shared/utils/routes";
import { HomePageLazy } from "@/pages/home/Home.page.pazy";

const routes: RouteObject[] = [
  {},
  {
    element: <AuthRedirectRoute />,
    children: [
      {
        path: ROUTE_PATHS.HOME,
        element: <HomePageLazy />,
      },
      {},
    ],
  },
];

const router = createBrowserRouter(routes);

export const Routes = () => <RouterProvider router={router} />;
