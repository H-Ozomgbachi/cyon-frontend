import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../api/main/appStore";
import DeactivationRequestCardAdmin from "./DeactivationRequestCardAdmin";
import NoResult from "../../shared/no-result";
import ContentTitle from "../../shared/content-title";

export default observer(function PendingDeactivationRequests() {
  const { accountManagementStore } = useStore();

  useEffect(() => {
    accountManagementStore.getAccountDeactivateRequest();
  }, [accountManagementStore]);

  return (
    <>
      <ContentTitle title="Pending Deactivations" />
      {accountManagementStore.pendingDeactivationRequests.length !== 0 ? (
        accountManagementStore.pendingDeactivationRequests.map((el) => (
          <DeactivationRequestCardAdmin key={el.id} data={el} />
        ))
      ) : (
        <NoResult title="No Pending Request" />
      )}
    </>
  );
});
