import { Box, Fab } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { Create } from "@mui/icons-material";
import ContentTitle from "../../shared/content-title";
import { useEffect } from "react";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import ElectionCardAdmin from "./ElectionCardAdmin";
import CreateOrUpdateElection from "./CreateOrUpdateElection";
import NoResult from "../../shared/no-result";
import "./Election.css";

export default observer(function ElectionAdmin() {
  const { electionStore, commonStore } = useStore();

  useEffect(() => {
    if (electionStore.elections.length === 0) {
      electionStore.fetchElections();
    }
  }, [electionStore]);

  return (
    <Box sx={{ p: 1 }}>
      <ContentTitle title="Elections Manager" />

      {electionStore.loadingElections ? (
        <MySkeleton count={3} />
      ) : electionStore.elections.length !== 0 ? (
        electionStore.elections.map((el, i) => (
          <ElectionCardAdmin key={el.id} data={el} />
        ))
      ) : (
        <NoResult title="No elections found" />
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
              <CreateOrUpdateElection election={null} />,
              "New Election",
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
