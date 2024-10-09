import { ROUTES_NAME } from "@/routes/routeNames";
import { lazyWithRetry } from "@/utils/lazyWithRetry";

//types
import { CustomRouteObject } from "@/models/CustomRouteObject.type";

const LoginPage = lazyWithRetry(
  () => import("../pages/LoginPage"),
  "LoginPage"
);
const RegisterPage = lazyWithRetry(
  () => import("../pages/RegisterPage"),
  "RegisterPage"
);

export const authenticationPageRoutes: CustomRouteObject[] = [
  {
    path: ROUTES_NAME.authentication.login,
    element: <LoginPage />,
    layout: "Login",
    // roles: ROLES,
  },
  {
    path: ROUTES_NAME.authentication.register,
    element: <RegisterPage />,
    layout: "Login",
    // roles: ROLES,
  },
];
