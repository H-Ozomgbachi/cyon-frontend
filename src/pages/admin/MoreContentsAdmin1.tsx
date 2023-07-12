import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Divider } from "@mui/material";
import BottomNav from "../../components/shared/bottom-nav";
import {
  EventAvailable,
  LocalPolice,
  MeetingRoom,
  PsychologyAlt,
} from "@mui/icons-material";
import HorizontalTabs from "../../components/shared/horizontal-tabs";
import UpcomingEventAdmin from "../../components/admin/upcoming-event/UpcomingEventAdmin";
import YearProgrammeAdmin from "../../components/admin/year-programme/YearProgrammeAdmin";
import HeaderNav from "../../components/shared/header-nav";
import MeetingAdmin from "../../components/admin/meeting/MeetingAdmin";
import MinuteAdmin from "../../components/admin/minute/MinuteAdmin";
import DecisionAdmin from "../../components/admin/decision/DecisionAdmin";
import RolesAdmin from "../../components/admin/roles/RolesAdmin";
import { useStore } from "../../api/main/appStore";

export default observer(function MoreContentsAdmin1() {
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
            label: "Meeting",
            icon: <MeetingRoom />,
          },
          {
            label: "Event",
            icon: <EventAvailable />,
          },
          {
            label: "Decision",
            icon: <PsychologyAlt />,
          },
          {
            label: "Roles",
            icon: <LocalPolice />,
          },
        ]}
        contentItems={[
          <HorizontalTabs
            tabNames={["Meeting", "Minute"]}
            tabContents={[<MeetingAdmin />, <MinuteAdmin />]}
          />,
          <HorizontalTabs
            tabNames={["upcoming", "programmes"]}
            tabContents={[<UpcomingEventAdmin />, <YearProgrammeAdmin />]}
          />,
          <DecisionAdmin />,
          <RolesAdmin />,
        ]}
      />
    </Box>
  );
});
