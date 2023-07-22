import requests from "../main/apiConfig";
import {
  ForgotPasswordDto,
  LoginPayload,
  LoginSuccess,
  RegisterMyAccountPayload,
  ResetPasswordDto,
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

  getAllUsers: () => requests.get<UserModel[]>("/authentication/GetAllUsers"),

  changeRole: (userId: string, payload: string[]) =>
    requests.post(`/authentication/account/${userId}/change-role`, payload),

  getUserById: (userId: string) =>
    requests.get<UserModel>(`/authentication/GetUserById/${userId}`),

  forgotPassword: (payload: ForgotPasswordDto) =>
    requests.post("/authentication/forgot-password", payload),

  resetPassword: (payload: ResetPasswordDto) =>
    requests.post<string>("/authentication/reset-password", payload),

  getNumOfUnwelcomedUser: () =>
    requests.get<number>("/authentication/NumberOfUnwelcomedUsers"),

  getNumberOfCelebrants: () =>
    requests.get<number>("/authentication/NumberOfBirthdayCelebrants"),

  confirmEmail: (email: string, passcode: string) =>
    requests.post(`/authentication/confirmEmail/${email}/${passcode}`),

  sendConfirmMessage: (email: string) =>
    requests.post(`/authentication/SendConfirmEmailMessage/${email}`),
};
