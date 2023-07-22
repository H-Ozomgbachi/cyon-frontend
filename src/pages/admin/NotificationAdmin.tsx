import { observer } from "mobx-react-lite";
import { Box, Divider } from "@mui/material";
import BottomNav from "../../components/shared/bottom-nav";
import { Alarm, Email } from "@mui/icons-material";
import HeaderNav from "../../components/shared/header-nav";
import EmailerAdmin from "../../components/admin/emailers/EmailerAdmin";

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
            label: "Reminders",
            icon: <Alarm />,
          },
        ]}
        contentItems={[<EmailerAdmin />, <></>]}
      />
    </Box>
  );
});
