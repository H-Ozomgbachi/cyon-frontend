import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { MeetingModel } from "../../api/models/meeting";
import MeetingCard from "./MeetingCard";

interface Props {
  data: MeetingModel;
}

export default function MeetingDetail({ data }: Props) {
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

      <Typography>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography>

      <Typography>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography>
    </Box>
  );
}
