import type { RolesType } from "@/utils/constant/roles";
import { RouteObject } from "react-router-dom";
import { ROUTES_NAME } from "../routeNames";

export const dayRoutes: Record<RolesType, RouteObject[]> = {
  adjuster: [
    {
      element: <></>,
      errorElement: "error",
      children: [
        { element: "paged", path: ROUTES_NAME.home },
        { element: "pagel", path: ROUTES_NAME.dashboard },
      ],
    },
  ],
  agent: [],
  branch: [],
};
