import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import HeaderNav from "../../components/shared/header-nav";

export default function Home() {
  return (
    <Box>
      <HeaderNav />

      <br />
      <Link to="/account/login">Login</Link>
      <Link to="/account/register">Register</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard">Dashboard</Link>
    </Box>
  );
}
