import { makeAutoObservable } from "mobx";
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

export class AuthenticationStore {
  currentUser: UserModel | null = null;

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
    customHistory.push(ROUTES.login);
  };

  getMyAccount = async () => {
    try {
      const user = await agent.authentication.myAccount();

      this.currentUser = user;
    } catch (error) {
      throw error;
    }
  };

  updateMyAccount = async (values: UpdateMyAccountPayload) => {
    try {
      store.commonStore.setLoading(true);

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

  setCurrentUser = (value: UserModel | null) => (this.currentUser = value);
}
