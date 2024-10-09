import { ROUTES_NAME } from "@/routes/routeNames";
import { lazyWithRetry } from "@/utils/lazyWithRetry";
import { CustomRouteObject } from "@/models/CustomRouteObject.type";

const NotFoundPage = lazyWithRetry(
  () => import("../pages/NotFoundPage"),
  "NotFoundPage"
);

export const notFoundPageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.notFound,
    element: <NotFoundPage />,
    layout: "App",
    // roles: ROLES,
  },
];
