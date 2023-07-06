import { makeAutoObservable, runInAction } from "mobx";
import { UpcomingEventModel } from "../models/upcomingEvent";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";

export class UpcomingEventStore {
  upcomingEvents: UpcomingEventModel[] = [];
  loadingUpcomingEvents = false;
  isDeletingUpcomingEvent = false;

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

  addUpcomingEvent = async (values: FormData) => {
    try {
      await agent.upcomingEvent.addUpcomingEvent(values);

      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Event added successfully");

      this.getUpcomingEvents();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  deleteUpcomingEvent = async (upcomingEventId: string) => {
    try {
      this.isDeletingUpcomingEvent = true;
      await agent.upcomingEvent.deleteUpcomingEvent(upcomingEventId);

      this.isDeletingUpcomingEvent = false;
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Event deleted successfully");

      this.getUpcomingEvents();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };
}
