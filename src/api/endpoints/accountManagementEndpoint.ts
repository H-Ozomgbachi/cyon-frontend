import requests from "../main/apiConfig";
import { DeactivateAccountRequest } from "../models/accountManagement";

export const AccountManagement = {
  requestToDeactivateAccount: (payload: DeactivateAccountRequest) =>
    requests.post("/AccountManagement/RequestToDeactivateAccount", payload),
};
