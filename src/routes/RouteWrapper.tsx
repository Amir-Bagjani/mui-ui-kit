import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense } from "react";

//pages
import LoadingPage from "@/modules/loading-page/pages/LoadingPage";
import ErrorBoundaryPage from "@/modules/error-boundary/pages/ErrorBoundaryPage";

//layouts
import { AppLayout } from "@/modules/layouts/AppLayout";
import { AuthLayout } from "@/modules/layouts/AuthLayout";

//utils
import { ROUTES_NAME } from "@/utils/routeNames";
import { APPLICATION_ROUTES, AUTH_ROUTES } from "./applicationRoutes";
import { AuthStatus, ROUTE_AUTH_STATUS, useAuth } from "@/context/AuthProvider";

//types
import type { User } from "@/models/user.type";
import type { CustomRouteObject } from "@/models/CustomRouteObject.type";

export const RouteWrapper = () => {
  const { user, status } = useAuth();

  const router = getRoutes(user, status);

  return <RouterProvider router={router} />;
};

const LayoutMap = {
  App: () => <AppLayout />,
  Login: () => <AuthLayout />,
};

const getRoutes = (user: User | null, status: AuthStatus) => {
  if (status === ROUTE_AUTH_STATUS.PENDING) {
    return createBrowserRouter(
      createRoutesFromElements(
        <Route errorElement={<ErrorBoundaryPage />}>
          <Route path="*" element={<LoadingPage />} />
        </Route>
      )
    );
  }

  if (!user) {
    return createBrowserRouter(
      createRoutesFromElements(
        <Route errorElement={<ErrorBoundaryPage />}>
          {AUTH_ROUTES.map((r, i) => (
            <Route
              key={i}
              element={LayoutMap[r.layout as keyof typeof LayoutMap]()}
            >
              <Route
                path={r.path}
                // TODO: create loading for fallback
                element={<Suspense fallback={""}>{r.element}</Suspense>}
              />
            </Route>
          ))}
          <Route
            path="*"
            element={<Navigate to={ROUTES_NAME.authentication.login} />}
          />
        </Route>
      )
    );
  }

  return createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorBoundaryPage />}>
        {validRoutes(APPLICATION_ROUTES)}
        <Route path="*" element={<Navigate to={ROUTES_NAME.notFound} />} />
      </Route>
    )
  );
};

const validRoutes = (routes: CustomRouteObject[]) => {
  return routes.map((r, i) => (
    <Route key={i} element={LayoutMap[r.layout as keyof typeof LayoutMap]()}>
      {r.hide ? (
        <Route path="*" element={<Navigate to={ROUTES_NAME.notFound} />} />
      ) : (
        <Route
          path={r.path}
          element={<Suspense fallback={""}>{r.element}</Suspense>}
        />
      )}
    </Route>
  ));
};
