import { Create } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import ContentTitle from "../shared/content-title";
import SummaryCard from "../shared/summary-card";
import ApologyCard from "./ApologyCard";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import AddApology from "./AddApology";
import { useEffect } from "react";
import MySkeleton from "../shared/loading-spinner/MySkeleton";

export default observer(function ApologyRecord() {
  const { commonStore, attendanceStore } = useStore();

  useEffect(() => {
    if (attendanceStore.myApologies.length === 0) {
      attendanceStore.getMyApologies();
    }
    attendanceStore.getApologySummary();
  }, [attendanceStore]);

  return (
    <Box>
      {attendanceStore.apologySummary ? (
        <SummaryCard
          firstTitle="Approved"
          firstValue={attendanceStore.apologySummary.approved}
          secondTitle="Declined"
          secondValue={attendanceStore.apologySummary.declined}
        />
      ) : (
        <MySkeleton count={1} />
      )}

      <ContentTitle title="Details" />

      {attendanceStore.loadingMyApologies ? (
        <MySkeleton count={4} />
      ) : (
        attendanceStore.myApologies.map((el, i) => (
          <ApologyCard key={i} data={el} />
        ))
      )}

      <Box
        sx={{
          position: "sticky",
          bottom: "16%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Fab
          size="medium"
          aria-label="add"
          onClick={() =>
            commonStore.setModalContent(<AddApology />, "Send An Apology")
          }
        >
          <Create
            sx={{
              color: "rgb(150, 114, 23)",
            }}
          />
        </Fab>
      </Box>
    </Box>
  );
});
