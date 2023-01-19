import { Done, HighlightOff } from "@mui/icons-material";
import { Avatar, Box, Chip, Paper, Rating, Typography } from "@mui/material";
import { AttendanceModel } from "../../api/models/attendance";
import { DateOnlyFormatter } from "../../helpers/formatters";
import GrowAnimation from "../shared/animate-content/GrowAnimation";

type Props = {
  data: AttendanceModel;
};

export default function AttendanceCard({ data }: Props) {
  const status = data.isPresent;
  const color = status ? "success" : "error";

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
          <Typography>{DateOnlyFormatter(data.dateAdded)}</Typography>

          <Chip
            size="small"
            color={color}
            avatar={
              <Avatar>
                {status ? (
                  <Done color={color} />
                ) : (
                  <HighlightOff color={color} />
                )}
              </Avatar>
            }
            label={status ? "Present" : "Absent"}
          />
        </Box>

        <Typography
          sx={{
            mt: 1,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {data.attendanceTypeName}
        </Typography>

        <Typography
          sx={{
            textAlign: "end",
          }}
        >
          <Rating size="small" value={data.rating} readOnly />
        </Typography>
      </Paper>
    </GrowAnimation>
  );
}
