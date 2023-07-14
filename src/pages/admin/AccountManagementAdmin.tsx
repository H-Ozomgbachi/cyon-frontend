import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Divider } from "@mui/material";
import BottomNav from "../../components/shared/bottom-nav";
import { LocalPolice, ToggleOffOutlined } from "@mui/icons-material";
import HeaderNav from "../../components/shared/header-nav";
import RolesAdmin from "../../components/admin/roles/RolesAdmin";
import { useStore } from "../../api/main/appStore";
import HorizontalTabs from "../../components/shared/horizontal-tabs";
import PendingDeactivationRequests from "../../components/admin/deactivations/PendingDeactivationRequests";
import InactiveAccounts from "../../components/admin/deactivations/InactiveAccounts";

export default observer(function AccountManagementAdmin() {
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
            label: "Roles",
            icon: <LocalPolice />,
          },
          {
            label: "Deactivations",
            icon: <ToggleOffOutlined />,
          },
        ]}
        contentItems={[
          <RolesAdmin />,
          <HorizontalTabs
            tabNames={["Requests", "inactive"]}
            tabContents={[
              <PendingDeactivationRequests />,
              <InactiveAccounts />,
            ]}
          />,
        ]}
      />
    </Box>
  );
});
