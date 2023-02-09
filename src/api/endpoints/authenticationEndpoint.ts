import requests from "../main/apiConfig";
import {
  LoginPayload,
  LoginSuccess,
  UserModel,
} from "../models/authentication";

export const Authentication = {
  login: (payload: LoginPayload) =>
    requests.post<LoginSuccess>("/authentication/login", payload),

  myAccount: () => requests.get<UserModel>("/authentication/account"),
};
