import { Navigate, RouteObject, useRoutes } from "react-router-dom";

//pages
import ErrorBoundaryPage from "@/modules/error-boundary/pages/ErrorBoundaryPage";
import LoadingPage from "@/modules/loading-page/pages/LoadingPage";

//layouts
import { AuthLayout } from "@/modules/layouts/AuthLayout";

//utils
import { AuthStatus, ROUTE_AUTH_STATUS, useAuth } from "@/context/AuthProvider";
import { ROUTES_NAME } from "@/routes/routeNames";

//types
import { MAIN_SETTING } from "@/app-setting/mainSettings";
import type { User } from "@/models/user.type";
import { DAY_INSURER } from "@/utils/constant/insurers";
import { dayRoutes } from "./insurer-routes/day";
import { lazyWithRetryComponent } from "./utils";

const LoginPage = lazyWithRetryComponent(
  () => import("@/modules/authentication/pages/LoginPage"),
  "LoginPage"
);

const allInsurerRoutes = {
  [DAY_INSURER]: dayRoutes,
} as const;

export const RouteWrapper = () => {
  const { user, status } = useAuth();

  const routes = getRoutes(user, status);

  return useRoutes(routes);
};

const getRoutes = (user: User | null, status: AuthStatus): RouteObject[] => {
  if (status === ROUTE_AUTH_STATUS.PENDING) {
    return [
      {
        errorElement: <ErrorBoundaryPage />,
        element: <LoadingPage />,
        path: ROUTES_NAME.anyRoutes,
      },
    ];
  }

  if (!user) {
    return [
      {
        errorElement: <ErrorBoundaryPage />,
        element: <AuthLayout />,
        children: [
          {
            element: <LoginPage />,
            path: ROUTES_NAME.authentication.login,
          },
          {
            path: ROUTES_NAME.anyRoutes,
            element: <Navigate to={ROUTES_NAME.authentication.login} />,
          },
        ],
      },
    ];
  }
  const routes = allInsurerRoutes[MAIN_SETTING.APP_INSURER][user.role];

  return routes;
};
