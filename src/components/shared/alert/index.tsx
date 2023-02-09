import * as React from "react";
import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "../../../api/main/appStore";

export default observer(function MyAlert() {
  const { commonStore } = useStore();

  React.useEffect(() => {
    if (commonStore.alertVisible) {
      const timer = setTimeout(() => commonStore.setAlertVisible(false), 6000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [commonStore]);

  return (
    <Box
      sx={{ width: "100%", position: "absolute", top: 0, left: 0, zIndex: 10 }}
    >
      <Collapse in={commonStore.alertVisible}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                commonStore.setAlertVisible(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity={commonStore.alertSeverity}
        >
          {commonStore.alertText}
        </Alert>
      </Collapse>
    </Box>
  );
});
