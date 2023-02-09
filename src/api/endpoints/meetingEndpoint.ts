import requests from "../main/apiConfig";
import { MeetingModel, MinutesModel } from "../models/meeting";

export const Meeting = {
  getAllMeetings: () => requests.get<MeetingModel[]>("/meetings"),

  getMinuteByMeetingDate: (date: string) =>
    requests.get<MinutesModel[]>(`/Minutes/GetMinuteByMeetingDate/${date}`),
};
