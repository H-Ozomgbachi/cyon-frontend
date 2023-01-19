import {
  AccessTime,
  CalendarMonth,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import { Box, Divider, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { MeetingModel } from "../../api/models/meeting";
import { DateOnlyFormatter, NumberToHourMin } from "../../helpers/formatters";
import GrowAnimation from "../shared/animate-content/GrowAnimation";

interface Props {
  data: MeetingModel;
}

dayjs.extend(duration);

export default function MeetingCard({ data }: Props) {
  return (
    <GrowAnimation>
      <Paper className="paper-bg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            {" "}
            <CalendarMonth fontSize="small" /> Date
          </Typography>

          <Typography>{DateOnlyFormatter(data.date)}</Typography>
        </Box>
        <Divider
          sx={{
            my: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            {" "}
            <ReceiptLongOutlined fontSize="small" /> Agenda
          </Typography>

          <Typography>{data.agenda.length}</Typography>
        </Box>
        <Divider
          sx={{
            my: 1,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            {" "}
            <AccessTime fontSize="small" /> Duration
          </Typography>

          <Typography>
            {NumberToHourMin(data.proposedDurationInMinutes)}
          </Typography>
        </Box>
      </Paper>
    </GrowAnimation>
  );
}
