import { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import HeaderNav from "../../components/shared/header-nav";
import BottomNav from "../../components/shared/bottom-nav";
import {
  AccountBalanceOutlined,
  AutoStoriesOutlined,
  FeedOutlined,
  Groups2Outlined,
  HowToVoteOutlined,
} from "@mui/icons-material";
import HorizontalTabs from "../../components/shared/horizontal-tabs";
import UserFinance from "../../components/finances/user-finance";
import OrganizationFinance from "../../components/finances/organization-finance";
import Attendance from "../../components/attendance";
import Meetings from "../../components/meeting";
import Feeds from "../../components/feeds";
import ActiveElections from "../../components/election/ActiveElections";
import { observer } from "mobx-react-lite";
import { store } from "../../api/main/appStore";

export default observer(function Dashboard() {
  const { electionStore } = store;

  useEffect(() => {
    electionStore.fetchActiveElections();
  }, [electionStore]);

  const hasActiveElections = electionStore.activeElections.length > 0;

  const navItems = useMemo(() => {
    const items = [
      { label: "Feeds", icon: <FeedOutlined /> },
      { label: "Attendance", icon: <AutoStoriesOutlined /> },
      { label: "Meeting", icon: <Groups2Outlined /> },
      { label: "Finances", icon: <AccountBalanceOutlined /> },
    ];
    if (hasActiveElections) {
      items.push({ label: "Elections", icon: <HowToVoteOutlined /> });
    }
    return items;
  }, [hasActiveElections]);

  const contentItems = useMemo(() => {
    const items = [
      <Feeds />,
      <Attendance />,
      <Meetings />,
      <HorizontalTabs
        tabNames={["personal", "organization"]}
        tabContents={[<UserFinance />, <OrganizationFinance />]}
      />,
    ];
    if (hasActiveElections) {
      items.push(<ActiveElections />);
    }
    return items;
  }, [hasActiveElections]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <HeaderNav />
      
      <Divider />

      <BottomNav
        navItems={navItems}
        contentItems={contentItems}
      />
    </Box>
  );
});
