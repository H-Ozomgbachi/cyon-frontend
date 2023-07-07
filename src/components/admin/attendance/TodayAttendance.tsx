import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";

export default observer(function TodayAttendance() {
  const { attendanceStore } = useStore();

  useEffect(() => {
    if (attendanceStore.todayAttendance.length === 0) {
      attendanceStore.getTodayAttendance();
    }
    attendanceStore.getTodayAttendance();
  }, [attendanceStore]);

  return (
    <Box>
      {attendanceStore.todayAttendance.map((el, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <strong>{i + 1}.</strong>
          <Typography>{el.name}</Typography>
        </Box>
      ))}
    </Box>
  );
});
