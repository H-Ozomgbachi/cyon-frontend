import { Box, Fab } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { Create } from "@mui/icons-material";
import ContentTitle from "../../shared/content-title";
import { useEffect } from "react";
import CreateOrUpdateMeeting from "./CreateOrUpdateMeeting";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import MeetingCardAdmin from "./MeetingCardAdmin";

export default observer(function MeetingAdmin() {
  const { meetingStore, commonStore } = useStore();

  useEffect(() => {
    if (meetingStore.meetings.length === 0) {
      meetingStore.getMeetings();
    }
  }, [meetingStore]);

  return (
    <Box>
      <ContentTitle title="General Meetings" />

      {meetingStore.loadingMeetings ? (
        <MySkeleton count={3} />
      ) : (
        meetingStore.meetings.map((el, i) => (
          <MeetingCardAdmin key={i} data={el} />
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
            commonStore.setModalContent(
              <CreateOrUpdateMeeting meeting={null} />,
              "New Meeting",
              true
            )
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
