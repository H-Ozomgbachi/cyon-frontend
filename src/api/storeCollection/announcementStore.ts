import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import { AnnouncementModel } from "../models/announcement";

export class AnnouncementStore {
  announcements: AnnouncementModel[] = [];
  loadingAnnouncements = false;

  constructor() {
    makeAutoObservable(this);
  }

  getAnnouncements = async () => {
    try {
      this.loadingAnnouncements = true;
      const result = await agent.announcement.getAnnouncements();

      runInAction(() => {
        this.announcements = result;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingAnnouncements = false;
    }
  };
}
