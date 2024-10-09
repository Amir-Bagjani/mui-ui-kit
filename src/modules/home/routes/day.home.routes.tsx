import NotFoundPage from "@/modules/not-found/pages/NotFoundPage";
import { ROUTES_NAME } from "@/routes/routeNames";
import { lazyWithRetryComponent } from "@/routes/utils";
import { RolesType } from "@/utils/constant/roles";
import { RouteObject, Navigate } from "react-router-dom";

const HomePage = lazyWithRetryComponent(
  () => import("../pages/HomePage"),
  "HomePage"
);

export const dayHomePageRoutes: Record<RolesType, RouteObject[]> = {
  agent: [
    {
      path: ROUTES_NAME.home,
      element: <HomePage />,
    },
    {
      path: ROUTES_NAME.anyRoutes,
      element: <NotFoundPage />,
    },
  ],
  adjuster: [
    {
      path: ROUTES_NAME.home,
      element: <HomePage />,
    },
    {
      path: ROUTES_NAME.anyRoutes,
      element: <NotFoundPage />,
    },
  ],
  branch: [
    {
      path: ROUTES_NAME.home,
      element: <HomePage />,
    },
    {
      path: ROUTES_NAME.anyRoutes,
      element: <NotFoundPage />,
    },
  ],
};
