import { makeAutoObservable } from "mobx";
import { DeactivateAccountRequest } from "../models/accountManagement";
import { store } from "../main/appStore";
import agent from "../main/apiAgent";

export class AccountManagementStore {
  constructor() {
    makeAutoObservable(this);
  }

  requestToDeactivateAccount = async (values: DeactivateAccountRequest) => {
    try {
      store.commonStore.setLoading(true);
      await agent.accountManagement.requestToDeactivateAccount(values);
      store.commonStore.setAlertText("Deactive request sent successfully");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      store.commonStore.setModalVisible(false);
    }
  };
}
