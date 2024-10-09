import { Navigate, Outlet } from "react-router-dom";

//utils
import { ROUTES_NAME } from "@/routes/routeNames";
import { useAuth } from "@/context/AuthProvider";

export const AppLayout = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to={ROUTES_NAME.authentication.login} />;

  return (
    <div className="flex">
      <Outlet />
    </div>
  );
};
