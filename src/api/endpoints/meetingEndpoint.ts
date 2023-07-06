import requests from "../main/apiConfig";
import { MeetingModel, MinutesModel } from "../models/meeting";

export const Meeting = {
  getAllMeetings: () => requests.get<MeetingModel[]>("/meetings"),

  getMinuteByMeetingDate: (date: string) =>
    requests.get<MinutesModel[]>(`/Minutes/GetMinuteByMeetingDate/${date}`),

  addMeeting: (payload: MeetingModel) => requests.post("/meetings", payload),

  updateMeeting: (payload: MeetingModel) => requests.put("/meetings", payload),

  getMinutes: () => requests.get<MinutesModel[]>("/Minutes"),

  addMinute: (payload: FormData) => requests.post("/Minutes", payload),

  deleteMinute: (minuteId: string) => requests.del(`/Minutes/${minuteId}`),
};
