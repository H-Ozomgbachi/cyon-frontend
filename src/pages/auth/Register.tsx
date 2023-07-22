import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import RegisterComponent from "../../components/register-component";
import BackgroundOne from "../../components/shared/bg-1/BackgroundOne";

export default observer(function Register() {
  const { departmentStore } = useStore();

  useEffect(() => {
    (async () => {
      await departmentStore.getDepartments();
    })();
  }, [departmentStore]);

  return (
    <BackgroundOne>
      <RegisterComponent />
    </BackgroundOne>
  );
});
