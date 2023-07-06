import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import { MeetingModel, MinutesModel } from "../models/meeting";
import { store } from "../main/appStore";

export class MeetingStore {
  meetings: MeetingModel[] = [];

  minutes: MinutesModel[] = [];
  minutesOfMeeting: MinutesModel[] = [];
  loadingMinuteOfMeeting = false;
  isDeletingMinute = false;

  loadingMeetings = false;
  loadingMinutes = false;

  constructor() {
    makeAutoObservable(this);
  }

  getMeetings = async () => {
    try {
      this.loadingMeetings = true;
      const result = await agent.meeting.getAllMeetings();

      runInAction(() => {
        this.meetings = result;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingMeetings = false;
    }
  };

  getMinutesByMeetingDate = async (date: string) => {
    try {
      this.loadingMinuteOfMeeting = true;

      const result = await agent.meeting.getMinuteByMeetingDate(date);

      runInAction(() => {
        this.minutesOfMeeting = result;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingMinuteOfMeeting = false;
    }
  };

  addMeeting = async (values: MeetingModel) => {
    try {
      await agent.meeting.addMeeting(values);

      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Meeting created successfully");

      this.getMeetings();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  updateMeeting = async (values: MeetingModel) => {
    try {
      await agent.meeting.updateMeeting(values);

      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Meeting updated successfully");

      this.getMeetings();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  getMinutes = async () => {
    try {
      this.loadingMinutes = true;
      const result = await agent.meeting.getMinutes();

      runInAction(() => {
        this.minutes = result;
      });
    } catch (error) {
      throw error;
    } finally {
      this.loadingMinutes = false;
    }
  };

  addMinute = async (values: FormData) => {
    try {
      await agent.meeting.addMinute(values);

      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Minute added successfully");

      this.getMinutes();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };

  deleteMinute = async (minuteId: string) => {
    try {
      this.isDeletingMinute = true;
      await agent.meeting.deleteMinute(minuteId);

      this.isDeletingMinute = false;
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Minute deleted successfully");

      this.getMinutes();
    } catch (error) {
      store.commonStore.setModalVisible(false);
      throw error;
    }
  };
}
