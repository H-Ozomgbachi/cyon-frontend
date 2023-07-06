import {
  AccessTime,
  CalendarMonth,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { Box, Divider, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import CreateOrUpdateMeeting from "./CreateOrUpdateMeeting";
import GrowAnimation from "../../shared/animate-content/GrowAnimation";
import {
  DateOnlyFormatter,
  NumberToHourMin,
} from "../../../helpers/formatters";
import { useStore } from "../../../api/main/appStore";
import { MeetingModel } from "../../../api/models/meeting";

interface Props {
  data: MeetingModel;
}

dayjs.extend(duration);

export default observer(function MeetingCardAdmin({ data }: Props) {
  const { commonStore } = useStore();

  return (
    <GrowAnimation>
      <div
        onClick={() =>
          commonStore.setModalContent(
            <CreateOrUpdateMeeting meeting={data} />,
            "",
            true
          )
        }
      >
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
      </div>
    </GrowAnimation>
  );
});
