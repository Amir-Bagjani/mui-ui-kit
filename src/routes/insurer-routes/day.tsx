import ErrorBoundaryPage from "@/modules/error-boundary/pages/ErrorBoundaryPage";
import { dayHomePageRoutes } from "@/modules/home/routes/day.home.routes";
import { AppLayout } from "@/modules/layouts/AppLayout";
import type { RolesType } from "@/utils/constant/roles";
import { RouteObject } from "react-router-dom";

export const dayRoutes: Record<RolesType, RouteObject[]> = {
  adjuster: [
    {
      element: <AppLayout />,
      errorElement: <ErrorBoundaryPage />,
      children: [
        ...dayHomePageRoutes.adjuster,
        // { element: "pagel", path: ROUTES_NAME.dashboard },
      ],
    },
  ],
  agent: [
    {
      element: <AppLayout />,
      errorElement: <ErrorBoundaryPage />,
      children: [
        ...dayHomePageRoutes.adjuster,
        // { element: "pagel", path: ROUTES_NAME.dashboard },
      ],
    },
  ],
  branch: [
    {
      element: <AppLayout />,
      errorElement: <ErrorBoundaryPage />,
      children: [
        ...dayHomePageRoutes.adjuster,
        // { element: "pagel", path: ROUTES_NAME.dashboard },
      ],
    },
  ],
};
