import { Box, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { customHistory } from "../..";
import { ROUTES } from "../../routes";
import HeaderNav from "../../components/shared/header-nav";
import ElectionAdmin from "../../components/admin/election/ElectionAdmin";

export default observer(function ElectionsAdminPage() {
  return (
    <Box>
      <HeaderNav />

      <Box sx={{ p: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => customHistory.push(ROUTES.adminPanel)}
          sx={{ mb: 1 }}
        >
          Back to Admin
        </Button>

        <ElectionAdmin />
      </Box>
    </Box>
  );
});
