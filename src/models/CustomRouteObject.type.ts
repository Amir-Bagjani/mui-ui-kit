import { RouteObject } from "react-router-dom";

//TODO: add role to CustomRouteObject
//TODO: remove hide

export type CustomRouteObjectLayout = "App" | "Login";

export type CustomRouteObject = RouteObject & {
  layout: CustomRouteObjectLayout;
  hide?: boolean;
};
