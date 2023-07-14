import { Box, Divider } from "@mui/material";
import { useEffect } from "react";
import CustomAccordion from "../../shared/custom-accordion";
import { AppRegistration, EditOff, MenuBook } from "@mui/icons-material";
import TakeAttendance from "./TakeAttendance";
import MarkAbsentees from "./MarkAbsentees";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import AttendanceRegister from "./AttendanceRegister";

export default observer(function AttendanceAdmin() {
  const { attendanceStore } = useStore();

  useEffect(() => {
    if (attendanceStore.attendanceTypes.length === 0) {
      attendanceStore.getAttendanceTypes();
    }
  }, [attendanceStore]);

  return (
    <Box>
      {attendanceStore.loadingAttendanceTypes ? (
        <MySkeleton count={1} />
      ) : (
        <CustomAccordion
          isExpanded={true}
          title="Take Attendance"
          titleIcon={<AppRegistration />}
          content={<TakeAttendance />}
        />
      )}

      <Divider
        sx={{
          my: 2,
        }}
      />

      {attendanceStore.loadingAttendanceTypes ? (
        <MySkeleton count={1} />
      ) : (
        <CustomAccordion
          isExpanded={true}
          title="Mark Absentees"
          titleIcon={<EditOff />}
          content={<MarkAbsentees />}
        />
      )}

      <Divider
        sx={{
          my: 2,
        }}
      />
      <CustomAccordion
        isExpanded={true}
        title="Attendance Register"
        content={<AttendanceRegister />}
        titleIcon={
          <MenuBook
            sx={{
              mr: 1,
            }}
          />
        }
      />
    </Box>
  );
});
