import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import { YearProgrammeModel } from "../models/year-programme";
import { store } from "../main/appStore";

export class YearProgrammeStore {
  yearProgrammes: YearProgrammeModel[] = [];
  loadingYearProgrammes = false;

  isDeletingYearProgramme = false;

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
}
