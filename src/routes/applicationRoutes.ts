import { homePageRoutes } from "@/modules/home/routes/home.routes";
import { notFoundPageRoutes } from "@/modules/not-found/routes/notFound.routes";
import { authenticationPageRoutes } from "@/modules/authentication/routes/authentication.routes";

//types
import { CustomRouteObject } from "@/models/CustomRouteObject.type";

export const APPLICATION_ROUTES: CustomRouteObject[] = [
  ...homePageRoutes,

  //notFound should located at the end of APPLICATION_ROUTES array list
  ...notFoundPageRoutes,
];
export const AUTH_ROUTES: CustomRouteObject[] = [
  ...authenticationPageRoutes,
];
