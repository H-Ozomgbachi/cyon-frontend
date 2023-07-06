import { Box, Button, CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { MinutesModel } from "../../../api/models/meeting";
import { Delete } from "@mui/icons-material";
import { useStore } from "../../../api/main/appStore";

interface Props {
  data: MinutesModel;
}

export default observer(function DeleteMinute({ data }: Props) {
  const { meetingStore } = useStore();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Button
        type="button"
        variant="contained"
        color="error"
        startIcon={<Delete />}
        onClick={() => meetingStore.deleteMinute(data.id!)}
      >
        {meetingStore.isDeletingMinute ? (
          <CircularProgress color="inherit" />
        ) : (
          "Delete"
        )}
      </Button>
    </Box>
  );
});
