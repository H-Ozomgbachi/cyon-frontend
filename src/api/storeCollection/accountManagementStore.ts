import { makeAutoObservable, runInAction } from "mobx";
import {
  AccountDeactivateRequestModel,
  DeactivateAccountRequest,
  GenerateRandomGroupDto,
} from "../models/accountManagement";
import { store } from "../main/appStore";
import agent from "../main/apiAgent";

export class AccountManagementStore {
  deactivateAccountRequests: AccountDeactivateRequestModel[] = [];
  loadingdeactivateAccountRequests = false;

  groupsResult = "";

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

  generateRandomUserGroups = async (values: GenerateRandomGroupDto) => {
    try {
      store.commonStore.setLoading(true);

      const response = await agent.accountManagement.generateRandomUserGroups(
        values
      );

      const val = response.map(
        (el) =>
          `${el.groupTitle.toUpperCase()}\n${el.members.map(
            (m) => `${m.firstName} ${m.lastName}, ${m.phoneNumber}`
          )}`
      );

      runInAction(() => {
        this.groupsResult = val.join("\n\n");
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getNumberOfActiveUsers = async () => {
    try {
      return await agent.accountManagement.getNumberOfActiveUsers();
    } catch (error) {
      throw error;
    }
  };

  getAccountDeactivateRequest = async () => {
    try {
      this.loadingdeactivateAccountRequests = true;

      const response =
        await agent.accountManagement.getAccountDeactivateRequest();

      runInAction(() => {
        this.deactivateAccountRequests = response;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingdeactivateAccountRequests = false;
    }
  };

  deactivateAccountasync = async (values: AccountDeactivateRequestModel) => {
    try {
      await agent.accountManagement.deactivateAccount(values);
    } catch (error) {
      throw error;
    }
  };
}
