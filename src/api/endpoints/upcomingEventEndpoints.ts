import requests from "../main/apiConfig";
import { UpcomingEventModel } from "../models/upcomingEvent";

export const UpcomingEvent = {
  getUpcomingEvents: () =>
    requests.get<UpcomingEventModel[]>("/UpcomingEvent/GetUpcomingEvents"),

  addUpcomingEvent: (payload: FormData) =>
    requests.post("/UpcomingEvent/AddUpcomingEvent", payload),

  deleteUpcomingEvent: (upcomingEventId: string) =>
    requests.del(`/UpcomingEvent/DeleteUpcomingEvent/${upcomingEventId}`),
};
