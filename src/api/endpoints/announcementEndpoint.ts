import requests from "../main/apiConfig";
import { AnnouncementModel } from "../models/announcement";

export const Announcement = {
  getAnnouncements: () => requests.get<AnnouncementModel[]>("/announcement"),
};
