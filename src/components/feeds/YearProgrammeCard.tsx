import { Chip, Paper, Typography } from "@mui/material";
import { YearProgrammeModel } from "../../api/models/year-programme";
import { DayAndMonthFormatter } from "../../helpers/formatters";

interface Props {
  data: YearProgrammeModel;
}

export default function YearProgrammeCard({ data }: Props) {
  return (
    <Paper
      elevation={0}
      className="year-programme-card_box"
      sx={{
        p: 1,
        height: "100%",
        backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0.462), rgba(0, 0, 0, 0.597)), url(${data.image})`,
      }}
    >
      <Typography
        sx={{
          color: "#eee",
          fontSize: "1.3rem",
          fontWeight: "bold",
          letterSpacing: 1,
          lineHeight: 1.3,
          textTransform: "capitalize",
        }}
      >
        {data.title}
      </Typography>
      <Chip
        label={data.scope}
        size="small"
        sx={{
          backgroundColor: "#ccc",
          color: "rgba(0, 148, 50, 0.8)",
          mt: 1,
        }}
      />

      <Typography
        sx={{
          color: "yellow",
          position: "absolute",
          bottom: 10,
          right: 5,
          fontWeight: "bold",
        }}
      >
        {DayAndMonthFormatter(data.startDate)}{" "}
        {data.endDate ? `- ${DayAndMonthFormatter(data.endDate)}` : null}
      </Typography>
    </Paper>
  );
}
