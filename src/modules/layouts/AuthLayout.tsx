import { Navigate, Outlet } from "react-router-dom";

//components & utils
import { useAuth } from "@/context/AuthProvider";
import { ROUTES_NAME } from "@/utils/routeNames";

export const AuthLayout = () => {
  const { user } = useAuth();

  if (user?.user_id) return <Navigate to={ROUTES_NAME.home} />;

  return (
    <div className="">
      <Outlet />
    </div>
  );
};
