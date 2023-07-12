import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import { OccupationModel, OccupationPayload } from "../models/occupaton";

export class OccupationStore {
  myOccupation: OccupationModel | null = null;
  loadingMyOccupation = false;

  constructor() {
    makeAutoObservable(this);
  }

  getMyOccupation = async () => {
    try {
      this.loadingMyOccupation = true;
      const result = await agent.occupation.getMyOccupation();

      runInAction(() => {
        this.myOccupation = result;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingMyOccupation = false;
    }
  };

  addMyOccupation = async (values: OccupationPayload) => {
    try {
      store.commonStore.setLoading(true);
      await agent.occupation.addOccupation(values);
      store.commonStore.setAlertText("Your occupation profile added");
      this.getMyOccupation();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  updateMyOccupation = async (values: OccupationPayload) => {
    try {
      store.commonStore.setLoading(true);
      await agent.occupation.updateOccupation(values);
      store.commonStore.setAlertText("Profile update was successful");
      this.getMyOccupation();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
