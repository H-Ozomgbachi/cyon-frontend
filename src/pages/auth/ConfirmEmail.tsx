import { observer } from "mobx-react-lite";
import BackgroundOne from "../../components/shared/bg-1/BackgroundOne";
import EmailConfirmationComponent from "../../components/email-confirmation-component";

export default observer(function ConfirmEmail() {
  return (
    <BackgroundOne>
      <EmailConfirmationComponent />
    </BackgroundOne>
  );
});
