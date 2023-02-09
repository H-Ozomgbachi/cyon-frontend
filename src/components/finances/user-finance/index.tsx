import { Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../api/main/appStore";
import { NairaFormatter } from "../../../helpers/formatters";
import ContentTitle from "../../shared/content-title";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import SummaryCard from "../../shared/summary-card";
import PersonalFinanceCard from "./PersonalFinanceCard";
import "./UserFinance.css";

export default observer(function UserFinance() {
  const { financeStore } = useStore();

  useEffect(() => {
    if (financeStore.userFinances.length === 0) {
      financeStore.getUserFinances();
    }
  }, [financeStore]);

  return (
    <Paper elevation={0}>
      <SummaryCard
        firstTitle="Contribution"
        firstValue={`${NairaFormatter(78500)}`}
        secondTitle="Debt"
        secondValue={NairaFormatter(0)}
      />

      <ContentTitle title="Details" />

      {financeStore.loadingUserFinances ? (
        <MySkeleton count={4} />
      ) : (
        financeStore.userFinances.map((el) => (
          <PersonalFinanceCard key={el.id} data={el} />
        ))
      )}
    </Paper>
  );
});
