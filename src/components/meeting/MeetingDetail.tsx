import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import { MeetingModel } from "../../api/models/meeting";
import MySkeleton from "../shared/loading-spinner/MySkeleton";
import MeetingCard from "./MeetingCard";

interface Props {
  data: MeetingModel;
}

export default observer(function MeetingDetail({ data }: Props) {
  const { meetingStore } = useStore();

  useEffect(() => {
    meetingStore.getMinutesByMeetingDate(data.date);
  }, [meetingStore, data.date]);

  const LinedTitle = (value: string) => (
    <Divider>
      <Typography
        sx={{
          color: "rgb(150, 114, 23)",
          mb: 1,
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        {value}
      </Typography>
    </Divider>
  );

  return (
    <Box>
      <MeetingCard data={data} />
      {LinedTitle("Agenda")}
      {data.agenda.map((el) => {
        return (
          <Card
            key={el.id}
            sx={{
              mb: 1,
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {el.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {el.description}
              </Typography>
            </CardContent>
          </Card>
        );
      })}

      {LinedTitle("Minutes")}

      {meetingStore.loadingMinuteOfMeeting ? (
        <MySkeleton count={2} />
      ) : meetingStore.minutesOfMeeting.length === 0 ? (
        <Typography color={"darkred"} paragraph>
          Minutes of this meeting has not yet been uploaded. Check back later.
        </Typography>
      ) : (
        <Typography paragraph>
          {meetingStore.minutesOfMeeting[0].content}
        </Typography>
      )}
    </Box>
  );
});
