import Box from "@mui/material/Box";
import { useEffect } from "react";
import { Divider } from "@mui/material";
import HeaderNav from "../../components/shared/header-nav";
import BottomNav from "../../components/shared/bottom-nav";
import {
  InfoOutlined,
  ListAlt,
  LocalAtm,
  MoreHoriz,
} from "@mui/icons-material";
import HorizontalTabs from "../../components/shared/horizontal-tabs";
import { observer } from "mobx-react-lite";
import OrganizationFinanceAdmin from "../../components/admin/organization-finance/OrganizationFinanceAdmin";
import UserFinanceAdmin from "../../components/admin/user-finance/UserFinanceAdmin";
import { useStore } from "../../api/main/appStore";
import MoreAdmin from "../../components/admin/more/MoreAdmin";
import AnnouncementAdmin from "../../components/admin/announcement/AnnouncementAdmin";
import ApologyAdmin from "../../components/admin/apology/ApologyAdmin";
import AttendanceAdmin from "../../components/admin/attendance/AttendanceAdmin";
import GroupingAdmin from "../../components/admin/grouping/GroupingAdmin";

export default observer(function Admin() {
  const { authenticationStore } = useStore();

  useEffect(() => {
    if (authenticationStore.usersOption.length === 0) {
      authenticationStore.getAllUsers();
    }
  }, [authenticationStore]);

  return (
    <Box>
      <HeaderNav />

      <Divider />

      <BottomNav
        navItems={[
          {
            label: "Register",
            icon: <ListAlt />,
          },
          {
            label: "Finance",
            icon: <LocalAtm />,
          },
          {
            label: "Info",
            icon: <InfoOutlined />,
          },
          {
            label: "More",
            icon: <MoreHoriz />,
          },
        ]}
        contentItems={[
          <HorizontalTabs
            tabNames={["Attendance", "Apology"]}
            tabContents={[<AttendanceAdmin />, <ApologyAdmin />]}
          />,

          <HorizontalTabs
            tabNames={["personal", "organization"]}
            tabContents={[<UserFinanceAdmin />, <OrganizationFinanceAdmin />]}
          />,
          <HorizontalTabs
            tabNames={["announcement", "grouping"]}
            tabContents={[<AnnouncementAdmin />, <GroupingAdmin />]}
          />,
          <MoreAdmin />,
        ]}
      />
    </Box>
  );
});
