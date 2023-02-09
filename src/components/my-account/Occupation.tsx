import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import MySkeleton from "../shared/loading-spinner/MySkeleton";
import AddOrModifyOccupation from "./AddOrModifyOccupation";

export default observer(function Occupation() {
  const { occupationStore } = useStore();

  useEffect(() => {
    if (occupationStore.myOccupation === null) {
      occupationStore.getMyOccupation();
    }
  }, [occupationStore]);

  return (
    <Box>
      {occupationStore.loadingMyOccupation ? (
        <Box
          sx={{
            p: 2,
          }}
        >
          <MySkeleton count={1} />
        </Box>
      ) : (
        <AddOrModifyOccupation data={occupationStore.myOccupation} />
      )}
    </Box>
  );
});
