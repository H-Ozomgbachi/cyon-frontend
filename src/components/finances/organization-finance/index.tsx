import { History, ReceiptLong } from "@mui/icons-material";
import { Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../api/main/appStore";
import CustomAccordion from "../../shared/custom-accordion";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import OrganizationAccountBalance from "./OrganizationAccountBalance";
import "./OrganizationFinance.css";
import OrganizationFinanceCard from "./OrganizationFinanceCard";
import ViewAccountStatement from "./ViewAccountStatement";

const balance = {
  balance: 156000,
};

export default observer(function OrganizationFinance() {
  const { financeStore } = useStore();

  useEffect(() => {
    if (financeStore.organizationFinances.length === 0) {
      financeStore.getOrganizationFinances();
    }
  }, [financeStore]);

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
            {financeStore.loadingOrganizationFinances ? (
              <MySkeleton count={4} />
            ) : (
              financeStore.organizationFinances.map((el) => (
                <OrganizationFinanceCard key={el.id} data={el} />
              ))
            )}
          </>
        }
      />
    </Paper>
  );
});
