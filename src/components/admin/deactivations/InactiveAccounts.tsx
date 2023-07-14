import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { useEffect } from "react";
import InactiveUserCardAdmin from "./InactiveUserCardAdmin";
import NoResult from "../../shared/no-result";
import ContentTitle from "../../shared/content-title";

export default observer(function InactiveAccounts() {
  const { accountManagementStore } = useStore();

  useEffect(() => {
    (async () => {
      await accountManagementStore.getInactiveUsers();
    })();
  }, [accountManagementStore]);

  return (
    <>
      <ContentTitle title="Inactive Members" />
      {accountManagementStore.inactiveUsers.length !== 0 ? (
        accountManagementStore.inactiveUsers.map((el) => (
          <InactiveUserCardAdmin key={el.id} data={el} />
        ))
      ) : (
        <NoResult title="No Inactive Account" />
      )}
    </>
  );
});
