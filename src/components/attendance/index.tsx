import { Box } from "@mui/material";
import HorizontalTabs from "../shared/horizontal-tabs";
import AttendanceRecord from "./AttendanceRecord";
import "./Attendance.css";
import ApologyRecord from "./ApologyRecord";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { useEffect } from "react";

export default observer(function Attendance() {
  const { attendanceStore } = useStore();

  useEffect(() => {
    if (attendanceStore.attendanceTypes.length === 0) {
      attendanceStore.getAttendanceTypes();
    }
  }, [attendanceStore]);

  return (
    <Box>
      <HorizontalTabs
        tabNames={["record", "apology"]}
        tabContents={[<AttendanceRecord />, <ApologyRecord />]}
      />
    </Box>
  );
});
