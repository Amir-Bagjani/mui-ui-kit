export const baseRoute = "/";
export const baseAuth = baseRoute + "authentication";

export const ROUTES_NAME = {
  home: baseRoute,
  notFound: baseRoute + "/not-found",
  authentication: {
    login: baseAuth + "/login",
    register: baseAuth + "/register",
  },
};
