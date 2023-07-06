import { Box, Button, CircularProgress } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Delete } from "@mui/icons-material";
import { useStore } from "../../../api/main/appStore";
import { OrganizationFinanceModel } from "../../../api/models/finance";

interface Props {
  data: OrganizationFinanceModel;
}

export default observer(function DeleteOrganizationFinance({ data }: Props) {
  const { financeStore } = useStore();

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
        onClick={() => financeStore.deleteOrganizationFinance(data.id!)}
      >
        {financeStore.isDeletingOrganizationFinance ? (
          <CircularProgress color="inherit" />
        ) : (
          "Delete"
        )}
      </Button>
    </Box>
  );
});
