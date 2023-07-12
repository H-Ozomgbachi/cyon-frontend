import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import ContentTitle from "../../shared/content-title";
import { useEffect } from "react";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import ApologyCardAdmin from "./ApologyCardAdmin";
import NoResult from "../../shared/no-result";

export default observer(function ApologyAdmin() {
  const { attendanceStore } = useStore();

  useEffect(() => {
    if (attendanceStore.pendingApologies.length === 0) {
      attendanceStore.getPendingApologies();
    }
  }, [attendanceStore]);

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <ContentTitle title="Pending Apologies" />

      {attendanceStore.loadingPendingApologies ? (
        <MySkeleton count={3} />
      ) : attendanceStore.pendingApologies.length !== 0 ? (
        attendanceStore.pendingApologies.map((el, i) => (
          <ApologyCardAdmin key={i} data={el} />
        ))
      ) : (
        <NoResult title="No Pending Apology" />
      )}
    </Box>
  );
});
