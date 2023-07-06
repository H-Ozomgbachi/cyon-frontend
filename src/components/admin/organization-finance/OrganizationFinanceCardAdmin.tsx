import { Apps, Wifi } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { OrganizationFinanceModel } from "../../../api/models/finance";
import { DateOnlyFormatter, NairaFormatter } from "../../../helpers/formatters";
// import "./OrganizationFinance.css";
import GrowAnimation from "../../shared/animate-content/GrowAnimation";

type Props = {
  data: OrganizationFinanceModel;
};

export default function OrganizationFinanceCardAdmin({ data }: Props) {
  return (
    <GrowAnimation>
      <Paper
        className={
          data.financeType === "Income"
            ? "organization-finance_box-income"
            : "organization-finance_box-expenditure"
        }
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#fff",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              letterSpacing: 1.2,
            }}
          >
            {data.financeType}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.7rem",
            }}
          >
            {DateOnlyFormatter(data.date)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1.4,
            alignItems: "center",
            px: 1,
          }}
        >
          <div className="organization-finance_atm">
            {" "}
            <Apps />
          </div>

          <div className="organization-finance_wifi">
            <Wifi />
          </div>
        </Box>

        <Typography
          sx={{
            mt: 1,
            color: "#ddd",
            textAlign: "center",
          }}
        >
          {data.description}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontSize: "1.2rem",
            textAlign: "end",
            color: "#fff",
          }}
        >
          {NairaFormatter(data.amount)}
        </Typography>
      </Paper>
    </GrowAnimation>
  );
}
