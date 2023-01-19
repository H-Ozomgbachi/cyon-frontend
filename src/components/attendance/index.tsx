import { Box } from "@mui/material";
import HorizontalTabs from "../shared/horizontal-tabs";
import AttendanceRecord from "./AttendanceRecord";
import "./Attendance.css";
import ApologyRecord from "./ApologyRecord";

export default function Attendance() {
  return (
    <Box>
      <HorizontalTabs
        tabNames={["record", "apology"]}
        tabContents={[<AttendanceRecord />, <ApologyRecord />]}
      />
    </Box>
  );
}
