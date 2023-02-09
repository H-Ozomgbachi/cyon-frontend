import { Paper } from "@mui/material";
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
        p: 1,
      }}
      elevation={0}
    >
      <ContentTitle title="General Meetings" />

      {meetingStore.loadingMeetings ? (
        <MySkeleton count={4} />
      ) : (
        meetingStore.meetings.map((el, i) => <MeetingCard key={i} data={el} />)
      )}
    </Paper>
  );
});
