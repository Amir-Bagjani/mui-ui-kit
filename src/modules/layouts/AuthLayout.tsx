import { Navigate, Outlet } from "react-router-dom";

//components & utils
import { useAuth } from "@/context/AuthProvider";
import { ROUTES_NAME } from "@/routes/routeNames";
import { Box } from "@mui/material";

export const AuthLayout = () => {
  const { user } = useAuth();

  if (user?.user_id) return <Navigate to={ROUTES_NAME.home} />;

  return (
    <Box sx={{ border: 1, p: 3, display: "flex" }}>
      <Box sx={{ width: 1 }}>
        <Outlet />
      </Box>
      <Box>auth layout</Box>
    </Box>
  );
};
