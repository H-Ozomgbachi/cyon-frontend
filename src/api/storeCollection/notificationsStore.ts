import { makeAutoObservable } from "mobx";
import { store } from "../main/appStore";
import agent from "../main/apiAgent";

export class NotificationsStore {
  constructor() {
    makeAutoObservable(this);
  }

  sendWelcomeMessages = async () => {
    try {
      store.commonStore.setLoading(true);
      await agent.notifications.sendWelcomeMessage();
      store.commonStore.setAlertText("Welcome emails sent successfully");

      store.authenticationStore.getNumOfUnwelcomedUser();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
  sendBirthdayWishes = async () => {
    try {
      store.commonStore.setLoading(true);
      await agent.notifications.sendBirthdayWishes();
      store.commonStore.setAlertText("Birthday emails sent successfully");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
  sendAnnouncementReminder = async (announcementId: string) => {
    try {
      store.commonStore.setModalVisible(false);
      store.commonStore.setLoading(true);
      await agent.notifications.sendAnnouncementReminder(announcementId);
      store.commonStore.setAlertText("Reminder sent successfully");
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };
}
