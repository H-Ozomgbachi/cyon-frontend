import requests from "../main/apiConfig";
import {
  AccountDeactivateRequestModel,
  DeactivateAccountRequest,
  GenerateRandomGroupDto,
  NumberOfActiveUsers,
  RandomGroupsModel,
} from "../models/accountManagement";
import { UserModel } from "../models/authentication";

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

  uploadProfilePic: (payload: FormData) =>
    requests.post("/AccountManagement/UploadProfilePicture", payload),

  deleteDeactivationRequest: (id: string) =>
    requests.del(`/AccountManagement/DeleteAccountDeactivationRequest/${id}`),

  getInactiveUsers: () =>
    requests.get<UserModel[]>("/AccountManagement/GetInactiveUsers"),

  reactivateUser: (userId: string) =>
    requests.post(`/AccountManagement/ReactivateAccount/${userId}`),
};
