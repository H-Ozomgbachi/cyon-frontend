import { observer } from "mobx-react-lite";
import { Backdrop } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";
import { useStore } from "../../../api/main/appStore";

export default observer(function LoadingSpinner() {
  const { commonStore } = useStore();

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={commonStore.loading}
      >
        <RotatingLines
          strokeColor="rgb(150, 114, 23)"
          strokeWidth="5"
          animationDuration="1"
          width="90"
          visible={true}
        />
      </Backdrop>
    </div>
  );
});
