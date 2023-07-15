import { makeAutoObservable, runInAction } from "mobx";
import {
  AccountDeactivateRequestModel,
  DeactivateAccountRequest,
  GenerateRandomGroupDto,
} from "../models/accountManagement";
import { store } from "../main/appStore";
import agent from "../main/apiAgent";
import { UserModel } from "../models/authentication";

export class AccountManagementStore {
  inactiveUsers: UserModel[] = [];
  pendingDeactivationRequests: AccountDeactivateRequestModel[] = [];

  groupsResult = "";

  constructor() {
    makeAutoObservable(this);
  }

  requestToDeactivateAccount = async (values: DeactivateAccountRequest) => {
    try {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(true);
      await agent.accountManagement.requestToDeactivateAccount(values);
      store.commonStore.setAlertText("Deactivation request sent successfully");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
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
            (m) => `${m.firstName} ${m.lastName} ${m.phoneNumber}\n`
          )}`
      );

      runInAction(() => {
        this.groupsResult = val.map((e) => e.replaceAll(",", "")).join("\n\n");
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
      store.commonStore.setLoading(true);

      const response =
        await agent.accountManagement.getAccountDeactivateRequest();

      runInAction(() => {
        this.pendingDeactivationRequests = response;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  deactivateAccount = async (values: AccountDeactivateRequestModel) => {
    try {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(true);

      await agent.accountManagement.deactivateAccount(values);
      store.commonStore.setAlertText(
        `Account for ${values.userName} deactivated`
      );
      this.getAccountDeactivateRequest();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getInactiveUsers = async () => {
    try {
      store.commonStore.setLoading(true);
      const res = await agent.accountManagement.getInactiveUsers();

      runInAction(() => {
        this.inactiveUsers = res;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  reactivateUser = async (userId: string) => {
    try {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(true);
      await agent.accountManagement.reactivateUser(userId);

      store.commonStore.setAlertText("One user reactivated successfully!");

      this.getInactiveUsers();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  deleteDeactivationRequest = async (id: string) => {
    try {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(true);
      await agent.accountManagement.deleteDeactivationRequest(id);

      store.commonStore.setAlertText("Request for deactivation removed!");

      this.getAccountDeactivateRequest();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
