import requests from "../main/apiConfig";
import { UpcomingEventModel } from "../models/upcomingEvent";

export const UpcomingEvent = {
  getUpcomingEvents: () =>
    requests.get<UpcomingEventModel[]>("/UpcomingEvent/GetUpcomingEvents"),
};
