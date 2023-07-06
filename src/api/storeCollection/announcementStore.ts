import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import {
  AnnouncementModel,
  CreateOrUpdateAnnouncement,
} from "../models/announcement";
import { store } from "../main/appStore";

export class AnnouncementStore {
  announcements: AnnouncementModel[] = [];
  loadingAnnouncements = false;

  isDeletingAnnouncement = false;

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

  addAnnouncement = async (values: CreateOrUpdateAnnouncement) => {
    try {
      await agent.announcement.addAnnouncement(values);

      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Announcement added successfully");

      this.latestAnnouncementList();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  updateAnnouncement = async (values: CreateOrUpdateAnnouncement) => {
    try {
      await agent.announcement.updateAnnouncement(values);

      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Announcement updated successfully");

      this.latestAnnouncementList();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  deleteAnnouncement = async (id: string) => {
    try {
      this.isDeletingAnnouncement = true;
      await agent.announcement.deleteAnnouncement(id);

      this.isDeletingAnnouncement = false;
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Announcement deleted successfully");

      this.latestAnnouncementList();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
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
