import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import { OrganizationFinanceModel, UserFinanceModel } from "../models/finance";

export class FinanceStore {
  userFinances: UserFinanceModel[] = [];
  loadingUserFinances = false;
  organizationFinances: OrganizationFinanceModel[] = [];
  loadingOrganizationFinances = false;

  constructor() {
    makeAutoObservable(this);
  }

  getUserFinances = async () => {
    try {
      this.loadingUserFinances = true;

      const result = await agent.finance.getUserFinances();

      runInAction(() => {
        this.userFinances = result;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingUserFinances = false;
    }
  };

  getOrganizationFinances = async () => {
    try {
      this.loadingOrganizationFinances = true;

      const result = await agent.finance.getOrganizationFinances();

      runInAction(() => {
        this.organizationFinances = result;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingOrganizationFinances = false;
    }
  };
}
