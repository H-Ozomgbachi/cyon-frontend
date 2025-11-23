import Box from "@mui/material/Box";
import { Container, Divider } from "@mui/material";
import HeaderNav from "../../components/shared/header-nav";
import BottomNav from "../../components/shared/bottom-nav";
import {
  AccountBalanceOutlined,
  AutoStoriesOutlined,
  FeedOutlined,
  Groups2Outlined,
} from "@mui/icons-material";
import HorizontalTabs from "../../components/shared/horizontal-tabs";
import UserFinance from "../../components/finances/user-finance";
import OrganizationFinance from "../../components/finances/organization-finance";
import Attendance from "../../components/attendance";
import Meetings from "../../components/meeting";
import Feeds from "../../components/feeds";
import { observer } from "mobx-react-lite";

export default observer(function Dashboard() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <HeaderNav />
      
      <Divider />

      <BottomNav
        navItems={[
          {
            label: "Feeds",
            icon: <FeedOutlined />,
          },
          {
            label: "Attendance",
            icon: <AutoStoriesOutlined />,
          },
          {
            label: "Meeting",
            icon: <Groups2Outlined />,
          },
          {
            label: "Finances",
            icon: <AccountBalanceOutlined />,
          },
        ]}
        contentItems={[
          <Feeds />,
          <Attendance />,
          <Meetings />,
          <HorizontalTabs
            tabNames={["personal", "organization"]}
            tabContents={[<UserFinance />, <OrganizationFinance />]}
          />,
        ]}
      />
    </Box>
  );
});
