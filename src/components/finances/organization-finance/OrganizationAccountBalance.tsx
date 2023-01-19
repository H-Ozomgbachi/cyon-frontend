import { Paper, Typography } from "@mui/material";
import { OrganizationBalanceModel } from "../../../api/models/finance";
import { NairaFormatter } from "../../../helpers/formatters";

type Props = {
  data: OrganizationBalanceModel;
};

export default function OrganizationAccountBalance({ data }: Props) {
  return (
    <Paper className="organization-account-balance_box">
      <Typography
        sx={{
          fontSize: "1.1rem",
          fontWeight: "bold",
          color: "#ddd",
        }}
      >
        Account Balance
      </Typography>
      <Typography
        sx={{
          fontSize: "1.7rem",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {NairaFormatter(data.balance)}
      </Typography>
    </Paper>
  );
}
