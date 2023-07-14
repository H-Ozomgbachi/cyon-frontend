import { observer } from "mobx-react-lite";
import ForgotPasswordComponent from "../../components/forgot-password-component";
import BackgroundOne from "../../components/shared/bg-1/BackgroundOne";

export default observer(function ForgotPassword() {
  return (
    <BackgroundOne>
      <ForgotPasswordComponent />
    </BackgroundOne>
  );
});
