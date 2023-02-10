import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../api/main/appStore";
import RegisterComponent from "../../components/register-component";
import BackgroundOne from "../../components/shared/bg-1/BackgroundOne";

export default observer(function Register() {
  const { departmentStore, commonStore } = useStore();

  useEffect(() => {
    if (departmentStore.departments.length === 0) {
      commonStore.setLoading(true);
      departmentStore
        .getDepartments()
        .finally(() => commonStore.setLoading(false));
    }
  }, [departmentStore, commonStore]);

  return (
    <BackgroundOne>
      <RegisterComponent />
    </BackgroundOne>
  );
});
