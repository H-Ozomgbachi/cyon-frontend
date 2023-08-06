import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import {
  TreasureResultModel,
  YearProgrammeModel,
} from "../models/year-programme";
import { store } from "../main/appStore";

export class YearProgrammeStore {
  yearProgrammes: YearProgrammeModel[] = [];
  loadingYearProgrammes = false;

  isDeletingYearProgramme = false;

  treasureResults: TreasureResultModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getCurrentYearProgrammes = async () => {
    try {
      this.loadingYearProgrammes = true;
      const result = await agent.yearProgramme.getYearProgrammes();

      runInAction(() => {
        this.yearProgrammes = result;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingYearProgrammes = false;
    }
  };

  addYearProgramme = async (values: FormData) => {
    try {
      await agent.yearProgramme.addYearProgramme(values);

      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Year programme added successfully");

      this.getCurrentYearProgrammes();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  deleteYearProgramme = async (id: string) => {
    try {
      this.isDeletingYearProgramme = true;
      await agent.yearProgramme.deleteYearProgramme(id);

      this.isDeletingYearProgramme = false;
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Year programme deleted successfully");

      this.getCurrentYearProgrammes();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  //Remove later
  postTreasureHuntResult = async () => {
    try {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(true);
      const user = store.authenticationStore.currentUser!;

      await agent.yearProgramme.postTreasureHuntResult({
        founderName: `${user.firstName} ${user.lastName}`,
        founderPhone: user.phoneNumber,
      });

      store.commonStore.setAlertText(
        "Congratulations!!! You found the treasure"
      );
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  getTreasureHuntResult = async () => {
    try {
      store.commonStore.setLoading(true);
      const res = await agent.yearProgramme.getTreasureHuntResult();

      runInAction(() => {
        this.treasureResults = res;
      });
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
