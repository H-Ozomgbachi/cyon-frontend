import requests from "../main/apiConfig";
import {
  AnnouncementModel,
  CreateOrUpdateAnnouncement,
} from "../models/announcement";

export const Announcement = {
  getAnnouncements: () => requests.get<AnnouncementModel[]>("/announcement"),

  addAnnouncement: (payload: CreateOrUpdateAnnouncement) =>
    requests.post("/announcement", payload),

  updateAnnouncement: (payload: CreateOrUpdateAnnouncement) =>
    requests.put("/announcement", payload),

  deleteAnnouncement: (id: string) => requests.del(`/announcement/${id}`),

  readAnnouncement: (id: string) =>
    requests.post(`/announcement/ReadAnnouncement/${id}`),
};
