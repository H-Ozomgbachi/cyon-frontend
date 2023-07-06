import { Box, Fab } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { Create } from "@mui/icons-material";
import ContentTitle from "../../shared/content-title";
import { useEffect } from "react";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import DeleteOrganizationFinance from "./DeleteOrganizationFinance";
import OrganizationFinanceCardAdmin from "./OrganizationFinanceCardAdmin";
import CreateOrganizationFinance from "./CreateOrganizationFinance";

export default observer(function OrganizationFinanceAdmin() {
  const { financeStore, commonStore } = useStore();

  useEffect(() => {
    if (financeStore.organizationFinances.length === 0) {
      financeStore.getOrganizationFinances();
    }
  }, [financeStore]);

  return (
    <Box>
      <ContentTitle title="Organization Finance" />

      {financeStore.loadingOrganizationFinances ? (
        <MySkeleton count={3} />
      ) : (
        financeStore.organizationFinances.map((el, i) => (
          <div
            onClick={() =>
              commonStore.setModalContent(
                <DeleteOrganizationFinance data={el} />,
                `Do you want to delete ${el.description}`
              )
            }
            key={el.id}
          >
            <OrganizationFinanceCardAdmin data={el} />
          </div>
        ))
      )}

      <Box
        sx={{
          position: "sticky",
          bottom: "16%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Fab
          size="medium"
          aria-label="add"
          onClick={() =>
            commonStore.setModalContent(
              <CreateOrganizationFinance />,
              "New CYON Finance",
              true
            )
          }
        >
          <Create
            sx={{
              color: "rgb(150, 114, 23)",
            }}
          />
        </Fab>
      </Box>
    </Box>
  );
});
