import { Box, Button, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { AccountDeactivateRequestModel } from "../../../api/models/accountManagement";

interface Props {
  data: AccountDeactivateRequestModel;
}

export default observer(function DeleteDeactivationRequest({ data }: Props) {
  const { accountManagementStore, commonStore } = useStore();

  return (
    <Paper elevation={0}>
      <Typography
        sx={{
          textAlign: "center",
        }}
      >
        Are you sure you want to delete this request ? This action is not
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
          onClick={() =>
            accountManagementStore.deleteDeactivationRequest(data.id)
          }
        >
          Yes
        </Button>
        <Button
          color="inherit"
          onClick={() => commonStore.setModalVisible(false)}
        >
          No
        </Button>
      </Box>
    </Paper>
  );
});
