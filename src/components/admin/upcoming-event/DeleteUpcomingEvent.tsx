import { Box, Button, CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Delete } from "@mui/icons-material";
import { useStore } from "../../../api/main/appStore";
import { UpcomingEventModel } from "../../../api/models/upcomingEvent";

interface Props {
  data: UpcomingEventModel;
}

export default observer(function DeleteUpcomingEvent({ data }: Props) {
  const { upcomingEventStore } = useStore();

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
        onClick={() => upcomingEventStore.deleteUpcomingEvent(data.id!)}
      >
        {upcomingEventStore.isDeletingUpcomingEvent ? (
          <CircularProgress color="inherit" />
        ) : (
          "Delete"
        )}
      </Button>
    </Box>
  );
});
