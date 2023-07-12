import { Avatar, Box, Chip, Paper, Typography } from "@mui/material";
import { UserFinanceModel } from "../../../api/models/finance";
import { DateOnlyFormatter, NairaFormatter } from "../../../helpers/formatters";
import GrowAnimation from "../../shared/animate-content/GrowAnimation";
import "./UserFinance.css";
import { Done, HighlightOff } from "@mui/icons-material";

type Props = {
  data: UserFinanceModel;
};

export default function PersonalFinanceCard({ data }: Props) {
  const color = data.financeType === "Pay" ? "success" : "error";

  return (
    <GrowAnimation>
      <Paper className="personal-finance_box">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{data.description}</Typography>
          <Chip
            size="small"
            color={color}
            avatar={
              <Avatar>
                {data.financeType === "Pay" ? (
                  <Done color={color} />
                ) : (
                  <HighlightOff color={color} />
                )}
              </Avatar>
            }
            label={data.financeType === "Pay" ? "Payment" : "Debt"}
          />
        </Box>
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
