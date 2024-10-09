import { Navigate, Outlet } from "react-router-dom";

//utils
import { ROUTES_NAME } from "@/routes/routeNames";
import { useAuth } from "@/context/AuthProvider";
import { Box } from "@mui/material";

export const AppLayout = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to={ROUTES_NAME.authentication.login} />;

  return (
    <Box>
      <Box
        sx={{ display: "grid", placeItems: "center", height: 60, border: 1 }}
      >
        header
      </Box>
      <Outlet />
    </Box>
  );
};
