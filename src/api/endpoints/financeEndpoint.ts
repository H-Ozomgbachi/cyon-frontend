import requests from "../main/apiConfig";
import {
  CreateUserFinance,
  CreateUserFinanceDues,
  DebtPaymentDto,
  OrganizationAccountStatementModelResult,
  OrganizationAccountStatementPayload,
  OrganizationBalanceModel,
  OrganizationFinanceModel,
  PayDuesByMonths,
  UserFinanceByRange,
  UserFinanceModel,
  UserFinanceSummaryModel,
} from "../models/finance";

export const Finance = {
  getUserFinances: () =>
    requests.get<UserFinanceModel[]>("/UserFinance/GetUserFinances"),

  addUserFinance: (payload: CreateUserFinance) =>
    requests.post("/UserFinance/AddUserFinance", payload),

  payDuesByAmount: (payload: CreateUserFinanceDues) =>
    requests.post("/UserFinance/PayDuesByAmount", payload),

  payDuesByMonths: (payload: PayDuesByMonths) =>
    requests.post("/UserFinance/PayDuesByMonths", payload),

  getUserFinanceSummary: () =>
    requests.get<UserFinanceSummaryModel>("/UserFinance/GetUserFinanceSummary"),

  getOrganizationFinances: () =>
    requests.get<OrganizationFinanceModel[]>(
      "/OrganisationFinance/GetOrganisationFinances"
    ),

  getOrganizationAccountBalance: () =>
    requests.get<OrganizationBalanceModel>(
      "/OrganisationFinance/GetOrganisationFinanceBalance"
    ),

  getOrganizationAccountStatement: (
    payload: OrganizationAccountStatementPayload
  ) =>
    requests.post<OrganizationAccountStatementModelResult>(
      "/OrganisationFinance/GetOrganisationAccountStatement",
      payload
    ),

  addOrganizationFinance: (payload: OrganizationFinanceModel) =>
    requests.post("/OrganisationFinance/AddOrganisationFinance", payload),

  deleteOrganizationFinance: (id: string) =>
    requests.del(`/OrganisationFinance/DeleteOrganisationFinance/${id}`),

  getUserDebts: (userId: string) =>
    requests.get<UserFinanceModel[]>(`/UserFinance/GetDebts/${userId}`),

  clearDebt: (payload: DebtPaymentDto) =>
    requests.post("/UserFinance/ClearDebt", payload),

  getUserFinanceByRange: (payload: UserFinanceByRange) =>
    requests.post<UserFinanceModel[]>(
      "/UserFinance/GetUserFinancesByDateRange",
      payload
    ),

  deleteUserFinance: (financeId: string) =>
    requests.del(`/UserFinance/DeleteUserFinance/${financeId}`),
};
