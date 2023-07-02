import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import { AnnouncementModel } from "../models/announcement";
import { store } from "../main/appStore";

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

  readAnnouncement = async (id: string, isRead: boolean) => {
    try {
      if (isRead) {
        return;
      }
      store.commonStore.setLoading(true);
      await agent.announcement.readAnnouncement(id);
      this.latestAnnouncementList();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  latestAnnouncementList = async () => {
    try {
      const result = await agent.announcement.getAnnouncements();

      runInAction(() => {
        this.announcements = result;
      });
    } catch (error) {
      throw error;
    }
  };
}
