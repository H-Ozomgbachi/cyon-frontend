import { makeAutoObservable, runInAction } from "mobx";
import { UpcomingEventModel } from "../models/upcomingEvent";
import agent from "../main/apiAgent";

export class UpcomingEventStore {
  upcomingEvents: UpcomingEventModel[] = [];
  loadingUpcomingEvents = false;

  constructor() {
    makeAutoObservable(this);
  }

  getUpcomingEvents = async () => {
    try {
      this.loadingUpcomingEvents = true;
      const result = await agent.upcomingEvent.getUpcomingEvents();

      runInAction(() => {
        this.upcomingEvents = result;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingUpcomingEvents = false;
    }
  };
}
