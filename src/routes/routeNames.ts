// import { useRoutes } from "react-router-dom";

export const baseRoute = "/";
export const baseAuth = baseRoute + "authentication";

export const ROUTES_NAME = {
  home: baseRoute,
  dashboard: baseRoute + "dashboard",
  notFound: baseRoute + "not-found",
  authentication: {
    login: baseAuth + "/login",
    register: baseAuth + "/register",
  },
  anyRoutes: "*",
};

