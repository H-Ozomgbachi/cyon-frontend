import "./SummaryCard.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, Divider, Paper, Typography } from "@mui/material";
import GrowAnimation from "../animate-content/GrowAnimation";

interface Props {
  firstTitle: string;
  firstValue: string;
  secondTitle: string;
  secondValue: string;
}

export default function SummaryCard({
  firstTitle,
  firstValue,
  secondTitle,
  secondValue,
}: Props) {
  return (
    <GrowAnimation>
      <Paper className="summary-card_box">
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: "bold",
            color: "#ddd",
            textDecorationLine: "underline",
            textUnderlineOffset: 1,
            textUnderlinePosition: "right",
          }}
        >
          Summary
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {firstTitle}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.4rem",
            }}
          >
            {firstValue} <ArrowUpward color="success" />
          </Typography>
        </Box>
        <Divider
          light={true}
          sx={{
            backgroundColor: "#fff",
            height: "0.4rem",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {secondTitle}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.4rem",
            }}
          >
            {secondValue} <ArrowDownward color="error" />
          </Typography>
        </Box>
      </Paper>
    </GrowAnimation>
  );
}
