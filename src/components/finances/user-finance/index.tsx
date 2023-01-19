import { Paper } from "@mui/material";
import { NairaFormatter } from "../../../helpers/formatters";
import ContentTitle from "../../shared/content-title";
import SummaryCard from "../../shared/summary-card";
import PersonalFinanceCard from "./PersonalFinanceCard";
import "./UserFinance.css";

const RESULTS = [
  {
    id: "6b9d0f9a-a21b-4e9a-48ab-08daef071909",
    description: "Monthly Dues",
    dateCollected: "2023-10-21T00:00:00",
    amount: 100,
  },
  {
    id: "712992fc-9c51-4550-48aa-08daef071909",
    description: "Monthly Dues",
    dateCollected: "2023-09-21T00:00:00",
    amount: 100,
  },
  {
    id: "d40f677e-e7c7-4244-48a9-08daef071909",
    description: "Monthly Dues",
    dateCollected: "2023-08-21T00:00:00",
    amount: 100,
  },
  {
    id: "5347ca77-ac80-4205-48a8-08daef071909",
    description: "Monthly Dues",
    dateCollected: "2023-07-21T00:00:00",
    amount: 100,
  },
  {
    id: "b91e32a3-26e4-4aa8-48a7-08daef071909",
    description: "Monthly Dues",
    dateCollected: "2023-06-21T00:00:00",
    amount: 100,
  },
  {
    id: "b4b9acec-382f-4a90-48a6-08daef071909",
    description: "Monthly Dues",
    dateCollected: "2023-05-21T00:00:00",
    amount: 100,
  },
  {
    id: "3f0dfcab-f1c8-4ab0-48a5-08daef071909",
    description: "Monthly Dues",
    dateCollected: "2023-04-21T00:00:00",
    amount: 100,
  },
  {
    id: "f17e768c-594f-45d5-48a4-08daef071909",
    description: "Monthly Dues",
    dateCollected: "2023-03-21T00:00:00",
    amount: 100,
  },
  {
    id: "9b548ac8-f584-4d2e-48a3-08daef071909",
    description: "Monthly Dues",
    dateCollected: "2023-02-21T00:00:00",
    amount: 100,
  },
  {
    id: "d60827ec-d067-4a9e-48a2-08daef071909",
    description: "Monthly Dues",
    dateCollected: "2023-01-21T00:00:00",
    amount: 100,
  },
];

export default function UserFinance() {
  return (
    <Paper elevation={0}>
      <SummaryCard
        firstTitle="Contribution"
        firstValue={`${NairaFormatter(78500)}`}
        secondTitle="Debt"
        secondValue={NairaFormatter(0)}
      />

      <ContentTitle title="Details" />

      {RESULTS.map((el) => (
        <PersonalFinanceCard key={el.id} data={el} />
      ))}
    </Paper>
  );
}
