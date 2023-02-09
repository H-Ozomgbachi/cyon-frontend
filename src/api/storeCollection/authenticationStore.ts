import { makeAutoObservable } from "mobx";
import { customHistory } from "../..";
import { ROUTES } from "../../routes";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import { LoginPayload, UserModel } from "../models/authentication";

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
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
      if (store.commonStore.token) {
        this.getMyAccount();
      }
    }
  };

  getMyAccount = async () => {
    try {
      const user = await agent.authentication.myAccount();

      this.currentUser = user;
    } catch (error) {
      throw error;
    }
  };

  initializeApp = async () => {
    if (store.commonStore.token) {
    }
  };
}
