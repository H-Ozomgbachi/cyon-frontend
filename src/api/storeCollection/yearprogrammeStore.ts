import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import { YearProgrammeModel } from "../models/year-programme";

export class YearProgrammeStore {
  yearProgrammes: YearProgrammeModel[] = [];
  loadingYearProgrammes = false;

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
}
