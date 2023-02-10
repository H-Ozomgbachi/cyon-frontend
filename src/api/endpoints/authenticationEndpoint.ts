import requests from "../main/apiConfig";
import {
  LoginPayload,
  LoginSuccess,
  RegisterMyAccountPayload,
  UpdateMyAccountPayload,
  UserModel,
} from "../models/authentication";

export const Authentication = {
  login: (payload: LoginPayload) =>
    requests.post<LoginSuccess>("/authentication/login", payload),

  myAccount: () => requests.get<UserModel>("/authentication/account"),

  updateMyAccount: (values: UpdateMyAccountPayload) =>
    requests.put<boolean>("/authentication/update-account", values),

  registerMyAccount: (values: RegisterMyAccountPayload) =>
    requests.post("/authentication/register", values),
};
