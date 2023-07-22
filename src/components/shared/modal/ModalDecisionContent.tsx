import "./ModalDecisionContent.css";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box, Button, Divider } from "@mui/material";

interface Props {
  actionName: string;
  actionCallback: () => void;
  futherDetail?: ReactJSXElement;
}

export default observer(function ModalDecisionContent({
  actionName,
  actionCallback,
  futherDetail,
}: Props) {
  const { commonStore } = useStore();

  return (
    <div>
      <div className="modal-decision-text">You are about to {actionName}</div>
      {futherDetail ? <Divider /> : null}

      <div className="">{futherDetail}</div>
      {futherDetail ? <Divider /> : null}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <Button onClick={actionCallback}>confirm</Button>
        <Button
          color="inherit"
          onClick={() => commonStore.setModalVisible(false)}
        >
          cancel
        </Button>
      </Box>
    </div>
  );
});
