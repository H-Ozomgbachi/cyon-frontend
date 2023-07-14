import { Box, Button, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { AccountDeactivateRequestModel } from "../../../api/models/accountManagement";

interface Props {
  data: AccountDeactivateRequestModel;
}

export default observer(function ApproveDeactivationRequest({ data }: Props) {
  const { accountManagementStore, commonStore } = useStore();

  return (
    <Paper elevation={0}>
      <Typography
        sx={{
          textAlign: "center",
        }}
      >
        Are you sure you want to approve this deactivation request ?
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <Button onClick={() => accountManagementStore.deactivateAccount(data)}>
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
