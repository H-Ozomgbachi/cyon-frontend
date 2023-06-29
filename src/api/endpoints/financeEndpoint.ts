import requests from "../main/apiConfig";
import {
  OrganizationAccountStatementModelResult,
  OrganizationAccountStatementPayload,
  OrganizationBalanceModel,
  OrganizationFinanceModel,
  UserFinanceModel,
  UserFinanceSummaryModel,
} from "../models/finance";

export const Finance = {
  getUserFinances: () =>
    requests.get<UserFinanceModel[]>("/UserFinance/GetUserFinances"),

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
};
