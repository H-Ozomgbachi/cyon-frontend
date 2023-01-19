import { History, ReceiptLong } from "@mui/icons-material";
import { Paper } from "@mui/material";
import CustomAccordion from "../../shared/custom-accordion";
import OrganizationAccountBalance from "./OrganizationAccountBalance";
import "./OrganizationFinance.css";
import OrganizationFinanceCard from "./OrganizationFinanceCard";
import ViewAccountStatement from "./ViewAccountStatement";

const RESULTS = [
  {
    id: "1ba823dd-27ae-4126-0ddf-08daee3772c6",
    financeType: "Income",
    description: "Dues collected",
    amount: 1500,
    date: "2023-01-04T09:37:51.834",
  },
  {
    id: "e1a9ef84-b033-4977-0de0-08daee3772c6",
    financeType: "Income",
    description: "Car wash",
    amount: 9500,
    date: "2023-01-04T09:37:51.834",
  },
  {
    id: "19d3d12b-bd98-4fe1-0de1-08daee3772c6",
    financeType: "Income",
    description: "Pledge redeemed by Adekoya",
    amount: 55000,
    date: "2023-01-04T09:42:33.606",
  },
  {
    id: "67804447-2f86-4b55-0de2-08daee3772c6",
    financeType: "Expenditure",
    description: "Omolara's wedding",
    amount: 10000,
    date: "2023-01-02T09:37:51.834",
  },
];

const balance = {
  balance: 56000,
};

export default function OrganizationFinance() {
  return (
    <Paper elevation={0}>
      <OrganizationAccountBalance data={balance} />

      <CustomAccordion
        isExpanded={true}
        title="View Statement"
        titleIcon={<ReceiptLong />}
        content={<ViewAccountStatement />}
      />

      <CustomAccordion
        isExpanded={true}
        title="Recent Records"
        titleIcon={<History />}
        content={
          <>
            {RESULTS.map((el) => (
              <OrganizationFinanceCard key={el.id} data={el} />
            ))}
          </>
        }
      />
    </Paper>
  );
}
