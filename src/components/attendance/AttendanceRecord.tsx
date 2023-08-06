import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import ContentTitle from "../shared/content-title";
import MySkeleton from "../shared/loading-spinner/MySkeleton";
import SummaryCard from "../shared/summary-card";
import AttendanceCard from "./AttendanceCard";

export default observer(function AttendanceRecord() {
  const { attendanceStore } = useStore();

  useEffect(() => {
    (async () => {
      await attendanceStore.getMyAttendance();
      await attendanceStore.getAttendanceSummary();
    })();
  }, [attendanceStore]);

  return (
    <Box>
      {attendanceStore.attendanceSummary ? (
        <SummaryCard
          firstTitle="Presence"
          firstValue={attendanceStore.attendanceSummary.presence}
          secondTitle="Absence"
          secondValue={attendanceStore.attendanceSummary.absence}
        />
      ) : (
        <MySkeleton count={1} />
      )}

      <ContentTitle title="Details" />

      {attendanceStore.loadingMyAttendance ? (
        <MySkeleton count={4} />
      ) : (
        attendanceStore.myAttendance.map((el, i) => (
          <AttendanceCard key={i} data={el} />
        ))
      )}
    </Box>
  );
});
