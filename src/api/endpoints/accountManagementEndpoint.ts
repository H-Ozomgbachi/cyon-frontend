import requests from "../main/apiConfig";
import {
  AccountDeactivateRequestModel,
  DeactivateAccountRequest,
  GenerateRandomGroupDto,
  NumberOfActiveUsers,
  RandomGroupsModel,
} from "../models/accountManagement";

export const AccountManagement = {
  requestToDeactivateAccount: (payload: DeactivateAccountRequest) =>
    requests.post("/AccountManagement/RequestToDeactivateAccount", payload),

  generateRandomUserGroups: (payload: GenerateRandomGroupDto) =>
    requests.post<RandomGroupsModel[]>(
      "/AccountManagement/GenerateRandomUserGroups",
      payload
    ),

  getNumberOfActiveUsers: () =>
    requests.get<NumberOfActiveUsers>(
      "/AccountManagement/GetNumberOfActiveUsers"
    ),

  getAccountDeactivateRequest: () =>
    requests.get<AccountDeactivateRequestModel[]>(
      "/AccountManagement/GetAccountDeactivateRequests"
    ),

  deactivateAccount: (payload: AccountDeactivateRequestModel) =>
    requests.post("/AccountManagement/DeactivateAccount", payload),
};
