import { Paper, Typography } from "@mui/material";
import { UserFinanceModel } from "../../../api/models/finance";
import { DateOnlyFormatter, NairaFormatter } from "../../../helpers/formatters";
import GrowAnimation from "../../shared/animate-content/GrowAnimation";
import "./UserFinance.css";

type Props = {
  data: UserFinanceModel;
};

export default function PersonalFinanceCard({ data }: Props) {
  return (
    <GrowAnimation>
      <Paper className="personal-finance_box">
        <Typography>{data.description}</Typography>
        <Typography
          sx={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#777",
          }}
        >
          {" "}
          {NairaFormatter(data.amount)}{" "}
        </Typography>
        <Typography
          sx={{
            textAlign: "end",
            fontSize: "0.7rem",
          }}
        >
          {DateOnlyFormatter(data.dateCollected)}
        </Typography>
      </Paper>
    </GrowAnimation>
  );
}
