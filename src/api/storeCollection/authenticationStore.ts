import { makeAutoObservable, runInAction } from "mobx";
import { customHistory } from "../..";
import { ROUTES } from "../../routes";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import {
  ForgotPasswordDto,
  LoginPayload,
  RegisterMyAccountPayload,
  ResetPasswordDto,
  UpdateMyAccountPayload,
  UserModel,
} from "../models/authentication";
import { SelectOptionModel } from "../../components/shared/models/selectOptionModel";

export class AuthenticationStore {
  currentUser: UserModel | null = null;
  allUsers: UserModel[] = [];
  numOfNewUsers = 0;

  usersOption: SelectOptionModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  login = async (values: LoginPayload) => {
    try {
      store.commonStore.setLoading(true);

      const result = await agent.authentication.login(values);

      store.commonStore.setToken(result.token);

      customHistory.push(ROUTES.dashboard);
    } catch (err: any) {
      store.commonStore.setAlertText(err?.response.data, true);
    } finally {
      if (store.commonStore.token) {
        this.getMyAccount();
      }

      store.commonStore.setLoading(false);
    }
  };

  logout = () => {
    this.setCurrentUser(null);
    store.commonStore.setToken(null);
    customHistory.replace(ROUTES.login);
  };

  getMyAccount = async () => {
    try {
      const user = await agent.authentication.myAccount();

      if (!user.emailConfirmed) {
        customHistory.push(ROUTES.confirmEmail, user.email);
      }

      this.currentUser = user;
    } catch (error) {
      customHistory.replace(ROUTES.login);
      throw error;
    }
  };

  updateMyAccount = async (
    values: UpdateMyAccountPayload,
    img: File | null
  ) => {
    try {
      store.commonStore.setLoading(true);

      if (img) {
        const formData = new FormData();
        formData.append("file", img);
        await agent.accountManagement.uploadProfilePic(formData);
      }

      const succeeded = await agent.authentication.updateMyAccount(values);

      if (succeeded) {
        window.scrollTo(0, 0);
        this.getMyAccount();
      }

      store.commonStore.setAlertText("Account update successful");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  registerMyAccount = async (values: RegisterMyAccountPayload) => {
    try {
      store.commonStore.setLoading(true);
      await agent.authentication.registerMyAccount(values);

      store.commonStore.setAlertText("Registration successful");

      this.login({ email: values.email, password: values.password });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getAllUsers = async () => {
    try {
      store.commonStore.setLoading(true);

      const result = await agent.authentication.getAllUsers();

      this.usersOption = result.map((el) => {
        return {
          text: `${el.firstName} ${el.lastName}`,
          value: el.id,
        };
      });

      runInAction(() => {
        this.allUsers = result;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getUserById = async (userId: string) => {
    try {
      store.commonStore.setLoading(true);

      const response = await agent.authentication.getUserById(userId);

      return response;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  changeRole = async (userId: string, values: string[]) => {
    try {
      store.commonStore.setLoading(true);

      await agent.authentication.changeRole(userId, values);

      store.commonStore.setAlertText("User role updated successfully");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  forgotPassword = async (values: ForgotPasswordDto) => {
    try {
      store.commonStore.setLoading(true);

      await agent.authentication.forgotPassword(values);

      store.commonStore.setAlertText(
        "Check your email for password reset information"
      );
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  resetPassword = async (values: ResetPasswordDto) => {
    try {
      store.commonStore.setLoading(true);

      const response = await agent.authentication.resetPassword(values);

      store.commonStore.setAlertText(response);

      customHistory.push(ROUTES.login);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getNumOfUnwelcomedUser = async () => {
    try {
      const res = await agent.authentication.getNumOfUnwelcomedUser();

      runInAction(() => {
        this.numOfNewUsers = res;
      });
    } catch (error) {
      throw error;
    }
  };

  getNumberOfCelebrants = async () => {
    try {
      const res = await agent.authentication.getNumberOfCelebrants();

      return res;
    } catch (error) {
      throw error;
    }
  };

  confirmEmail = async (email: string, passcode: string) => {
    try {
      store.commonStore.setLoading(true);

      await agent.authentication.confirmEmail(email, passcode);

      store.commonStore.setAlertText(
        "Email confirmation successful. You can now login"
      );
      customHistory.push(ROUTES.login);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  sendConfirmMessage = async (email: string) => {
    try {
      store.commonStore.setLoading(true);

      await agent.authentication.sendConfirmMessage(email);

      store.commonStore.setAlertText(
        "A passcode was sent to your email for confirmation. If not found in your inbox folder, please check the SPAM folder and mark as not spam so that further emails will be sent directly to your inbox. Thanks!"
      );
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  setCurrentUser = (value: UserModel | null) => (this.currentUser = value);
}
