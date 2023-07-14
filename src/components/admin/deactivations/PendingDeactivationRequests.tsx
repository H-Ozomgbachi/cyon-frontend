import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../../api/main/appStore";
import { AccountDeactivateRequestModel } from "../../../api/models/accountManagement";
import DeactivationRequestCardAdmin from "./DeactivationRequestCardAdmin";
import NoResult from "../../shared/no-result";
import ContentTitle from "../../shared/content-title";

export default observer(function PendingDeactivationRequests() {
  const { accountManagementStore } = useStore();
  const [pendingRequests, setPendingRequests] = useState<
    AccountDeactivateRequestModel[]
  >([]);

  useEffect(() => {
    (async () => {
      const response =
        await accountManagementStore.getAccountDeactivateRequest();

      setPendingRequests(response);
    })();
  }, [accountManagementStore]);

  return (
    <>
      <ContentTitle title="Pending Deactivations" />
      {pendingRequests.length !== 0 ? (
        pendingRequests.map((el) => (
          <DeactivationRequestCardAdmin key={el.id} data={el} />
        ))
      ) : (
        <NoResult title="No Pending Request" />
      )}
    </>
  );
});
