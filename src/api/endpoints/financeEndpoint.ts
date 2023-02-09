import requests from "../main/apiConfig";
import { OrganizationFinanceModel, UserFinanceModel } from "../models/finance";

export const Finance = {
  getUserFinances: () =>
    requests.get<UserFinanceModel[]>("/UserFinance/GetUserFinances"),

  getOrganizationFinances: () =>
    requests.get<OrganizationFinanceModel[]>(
      "/OrganisationFinance/GetOrganisationFinances"
    ),
};
