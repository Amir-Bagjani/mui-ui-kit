import { ROUTES_NAME } from "@/routes/routeNames";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { CustomRouteObject } from "@/models/CustomRouteObject.type";

const HomePage = lazyWithRetry(() => import("../pages/HomePage"), "HomePage");

export const homePageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.home,
    element: <HomePage />,
    layout: "App",
    // roles: ROLES,
  },
];
