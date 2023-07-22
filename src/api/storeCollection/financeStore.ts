import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import {
  CreateUserFinance,
  CreateUserFinanceDues,
  DebtPaymentDto,
  OrganizationAccountStatementPayload,
  OrganizationBalanceModel,
  OrganizationFinanceModel,
  UserFinanceByRange,
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

  isDeletingOrganizationFinance = false;
  isDeletingUserFinance = false;

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

  addUserFinance = async (values: CreateUserFinance) => {
    try {
      store.commonStore.setLoading(true);

      await agent.finance.addUserFinance(values);

      store.commonStore.setAlertText("User finance added successfully");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  payDuesByAmount = async (values: CreateUserFinanceDues) => {
    try {
      store.commonStore.setLoading(true);
      await agent.finance.payDuesByAmount(values);

      store.commonStore.setAlertText("Dues payment successful");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      window.scrollTo(0, 0);
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

  addOrganizationFinance = async (values: OrganizationFinanceModel) => {
    try {
      await agent.finance.addOrganizationFinance(values);

      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Org. Finance added successfully");

      this.getOrganizationFinances();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  deleteOrganizationFinance = async (id: string) => {
    try {
      this.isDeletingOrganizationFinance = true;
      await agent.finance.deleteOrganizationFinance(id);

      this.isDeletingOrganizationFinance = false;
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Org. Finance deleted successfully");

      this.getOrganizationFinances();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  getUserDebts = async (userId: string) => {
    try {
      store.commonStore.setLoading(true);

      return await agent.finance.getUserDebts(userId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  clearDebt = async (values: DebtPaymentDto) => {
    try {
      store.commonStore.setLoading(true);
      await agent.finance.clearDebt(values);

      window.scrollTo(0, 0);
      store.commonStore.setAlertText("Debt clearance was successful");
      return values.amountToClear;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getUserFinanceByRange = async (values: UserFinanceByRange) => {
    try {
      store.commonStore.setLoading(true);
      return await agent.finance.getUserFinanceByRange(values);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  deleteUserFinance = async (id: string) => {
    try {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(true);

      await agent.finance.deleteUserFinance(id);

      store.commonStore.setAlertText("User Finance deleted successfully");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
