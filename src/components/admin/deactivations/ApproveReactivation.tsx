import { Box, Button, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { UserModel } from "../../../api/models/authentication";

interface Props {
  data: UserModel;
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
        Are you sure you want to activate {data.firstName}'s account?
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
          color="success"
          onClick={() => accountManagementStore.reactivateUser(data.id)}
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
