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
    if (attendanceStore.myAttendance.length === 0) {
      attendanceStore.getMyAttendance();
    }
  }, [attendanceStore]);

  return (
    <Box>
      <SummaryCard
        firstTitle="Presence"
        firstValue={"80%"}
        secondTitle="Absence"
        secondValue={"20%"}
      />

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
