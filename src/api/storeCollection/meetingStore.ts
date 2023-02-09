import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import { MeetingModel, MinutesModel } from "../models/meeting";

export class MeetingStore {
  meetings: MeetingModel[] = [];
  minutesOfMeeting: MinutesModel[] = [];
  loadingMinuteOfMeeting = false;
  loadingMeetings = false;

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
}
