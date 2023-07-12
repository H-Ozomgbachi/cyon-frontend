import { Backdrop } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";
import { observer } from "mobx-react-lite";
import { customHistory } from "../..";

//This should be changed once the home landing page is built

export default observer(function Home() {
  customHistory.back();
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
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
