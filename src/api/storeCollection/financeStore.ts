import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import {
  OrganizationAccountStatementPayload,
  OrganizationBalanceModel,
  OrganizationFinanceModel,
  UserFinanceModel,
  UserFinanceSummaryModel,
} from "../models/finance";
import { store } from "../main/appStore";

export class FinanceStore {
  userFinances: UserFinanceModel[] = [];
  loadingUserFinances = false;
  organizationFinances: OrganizationFinanceModel[] = [];
  organizationBalance: OrganizationBalanceModel | null = null;
  userFinanceSummary: UserFinanceSummaryModel | null = null;

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

  getOrganizationAccountBalance = async () => {
    try {
      const result = await agent.finance.getOrganizationAccountBalance();

      runInAction(() => {
        this.organizationBalance = result;
      });
    } catch (error) {
      throw error;
    }
  };

  getUserFinanceSummary = async () => {
    try {
      const result = await agent.finance.getUserFinanceSummary();

      runInAction(() => {
        this.userFinanceSummary = result;
      });
    } catch (error) {
      throw error;
    }
  };

  getOrganizationAccountStatement = async (
    values: OrganizationAccountStatementPayload
  ) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.finance.getOrganizationAccountStatement(
        values
      );

      return result.accountStatement;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
