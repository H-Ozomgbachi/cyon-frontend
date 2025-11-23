import { Grid, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import ContentTitle from "../shared/content-title";
import MySkeleton from "../shared/loading-spinner/MySkeleton";
import "./Meeting.css";
import MeetingCard from "./MeetingCard";

export default observer(function Meetings() {
  const { meetingStore } = useStore();

  useEffect(() => {
    if (meetingStore.meetings.length === 0) {
      meetingStore.getMeetings();
    }
  }, [meetingStore]);

  return (
    <Paper
      sx={{
        p: { xs: 1, md: 2 },
      }}
      elevation={0}
    >
      <ContentTitle title="General Meetings" />

      {meetingStore.loadingMeetings ? (
        <MySkeleton count={4} />
      ) : (
        <Grid container spacing={2}>
          {meetingStore.meetings.map((el, i) => (
            <Grid item xs={12} md={6} lg={4} key={i}>
              <MeetingCard data={el} />
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
});
