import { observer } from "mobx-react-lite";
import { Box, Divider } from "@mui/material";
import BottomNav from "../../components/shared/bottom-nav";
import { Email, Gamepad } from "@mui/icons-material";
import HeaderNav from "../../components/shared/header-nav";
import EmailerAdmin from "../../components/admin/emailers/EmailerAdmin";
import TreasureHuntResultAdmin from "../../components/admin/games/TreasureHuntResultAdmin";

export default observer(function NotificationAdmin() {
  return (
    <Box>
      <HeaderNav />

      <Divider />

      <BottomNav
        navItems={[
          {
            label: "Emailer",
            icon: <Email />,
          },
          {
            label: "Games",
            icon: <Gamepad />,
          },
        ]}
        contentItems={[<EmailerAdmin />, <TreasureHuntResultAdmin />]}
      />
    </Box>
  );
});
