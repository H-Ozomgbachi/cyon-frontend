import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import "./MyModal.css";
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Clear } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default observer(function MyModal() {
  const { commonStore } = useStore();

  const handleClose = () => {
    commonStore.setModalVisible(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={commonStore.isModalFullScreen}
        open={commonStore.modalVisible}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {commonStore.isModalFullScreen ? (
          <>
            <DialogActions>
              <Button
                sx={{
                  color: "#777",
                }}
                onClick={handleClose}
              >
                <Clear />
              </Button>
            </DialogActions>
            <Divider />
          </>
        ) : null}
        <DialogTitle>{commonStore.modalTitle}</DialogTitle>
        <DialogContent>{commonStore.modalContent}</DialogContent>
      </Dialog>
    </div>
  );
});
