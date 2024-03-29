import { Chip, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { YearProgrammeModel } from "../../../api/models/year-programme";
import { DayAndMonthFormatter, IsDaySame } from "../../../helpers/formatters";

interface Props {
  data: YearProgrammeModel;
}

export default observer(function YearProgrammeCardAdmin({ data }: Props) {
  return (
    <Paper
      elevation={0}
      className="year-programme-card_box"
      sx={{
        p: 1,
        height: "180px",
        backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0.462), rgba(0, 0, 0, 0.597)), url(${data.imageUrl})`,
        mb: 2,
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
          mt: 2,
          fontWeight: "bold",
        }}
      >
        {DayAndMonthFormatter(data.startDate)}{" "}
        {IsDaySame(data.startDate, data.endDate) === false
          ? `- ${DayAndMonthFormatter(data.endDate)}`
          : null}
      </Typography>
    </Paper>
  );
});
