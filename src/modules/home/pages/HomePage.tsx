import { useRole } from "@/hooks/common/userRole";
import { ROUTES_NAME } from "@/routes/routeNames";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isAdjuster } = useRole();

  return (
    <Container sx={{ py: 4 }}>
      this is home page
      {isAdjuster ? (
        <Link to={ROUTES_NAME.dashboard}>go to dashboard - just adjuster</Link>
      ) : null}
    </Container>
  );
};

export default HomePage;
