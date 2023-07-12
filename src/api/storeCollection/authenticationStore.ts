import { makeAutoObservable, runInAction } from "mobx";
import { customHistory } from "../..";
import { ROUTES } from "../../routes";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import {
  LoginPayload,
  RegisterMyAccountPayload,
  UpdateMyAccountPayload,
  UserModel,
} from "../models/authentication";
import { SelectOptionModel } from "../../components/shared/models/selectOptionModel";

export class AuthenticationStore {
  currentUser: UserModel | null = null;
  allUsers: UserModel[] = [];

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

  setCurrentUser = (value: UserModel | null) => (this.currentUser = value);
}
