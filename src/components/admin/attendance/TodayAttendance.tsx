import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { Check, Clear } from "@mui/icons-material";

export default observer(function TodayAttendance() {
  const { attendanceStore } = useStore();

  useEffect(() => {
    (async () => {
      await attendanceStore.getTodayAttendance();
    })();
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

          {el.isPresent ? <Check color="success" /> : <Clear color="error" />}
        </Box>
      ))}
    </Box>
  );
});
