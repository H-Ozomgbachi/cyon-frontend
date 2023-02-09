import { Box, Divider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import MyAccount from "../../components/my-account";
import HeaderNav from "../../components/shared/header-nav";

export default observer(function Account() {
  const { authenticationStore } = useStore();

  useEffect(() => {
    if (authenticationStore.currentUser === null) {
      authenticationStore.getMyAccount();
    }
  }, [authenticationStore]);

  return (
    <Box>
      <HeaderNav />
      <Divider />

      <MyAccount />
    </Box>
  );
});
