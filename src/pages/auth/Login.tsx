import { observer } from "mobx-react-lite";
import LoginComponent from "../../components/login-component";
import BackgroundOne from "../../components/shared/bg-1/BackgroundOne";

export default observer(function Login() {
  return (
    <BackgroundOne>
      <LoginComponent />
    </BackgroundOne>
  );
});
