import { observer } from "mobx-react-lite";
import ResetPasswordComponent from "../../components/reset-password-component";
import BackgroundOne from "../../components/shared/bg-1/BackgroundOne";
import { useStore } from "../../api/main/appStore";
import { useEffect } from "react";

export default observer(function ResetPassword() {
  const { commonStore } = useStore();

  useEffect(() => {
    commonStore.setOnreloadPath("null");
  }, [commonStore]);

  return (
    <BackgroundOne>
      <ResetPasswordComponent />
    </BackgroundOne>
  );
});
