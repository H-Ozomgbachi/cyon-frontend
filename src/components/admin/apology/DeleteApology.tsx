import { Box, Button, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ApologyModel } from "../../../api/models/attendance";
import { useStore } from "../../../api/main/appStore";

interface Props {
  data: ApologyModel;
}

export default observer(function DeleteApology({ data }: Props) {
  const { attendanceStore, commonStore } = useStore();

  return (
    <Paper elevation={0}>
      <Typography
        sx={{
          color: "red",
        }}
      >
        Are you sure you want to delete this apology ? This action is to
        reversible!
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <Button
          color="error"
          onClick={() => attendanceStore.deleteApology(data.id)}
        >
          Yes
        </Button>
        <Button
          color="secondary"
          onClick={() => commonStore.setModalVisible(false)}
        >
          No
        </Button>
      </Box>
    </Paper>
  );
});
