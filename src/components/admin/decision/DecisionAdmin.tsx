import { Box, Fab } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { Create } from "@mui/icons-material";
import ContentTitle from "../../shared/content-title";
import { useEffect } from "react";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import DecisionCardAdmin from "./DecisionCardAdmin";
import CreateOrUpdateDecision from "./CreateOrUpdateDecision";

export default observer(function DecisionAdmin() {
  const { decisionStore, commonStore } = useStore();

  useEffect(() => {
    if (decisionStore.decisionsAtAdmin.length === 0) {
      decisionStore.getDecisionsAdAdmin();
    }
  }, [decisionStore]);

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <ContentTitle title="Decisions Manager" />

      {decisionStore.loadingDecisionsAtAdmin ? (
        <MySkeleton count={3} />
      ) : (
        decisionStore.decisionsAtAdmin.map((el, i) => (
          <DecisionCardAdmin key={i} data={el} />
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
              <CreateOrUpdateDecision decision={null} />,
              "New Decision",
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
