import { Box, Divider } from "@mui/material";
import MyAccount from "../../components/my-account";
import HeaderNav from "../../components/shared/header-nav";

export default function Account() {
  return (
    <Box>
      <HeaderNav />
      <Divider />

      <MyAccount />
    </Box>
  );
}
