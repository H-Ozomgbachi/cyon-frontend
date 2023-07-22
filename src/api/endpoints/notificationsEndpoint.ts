import requests from "../main/apiConfig";

export const Notifications = {
  sendWelcomeMessage: () => requests.post("/Notifications/SendWelcomeMessages"),

  sendAnnouncementReminder: (announcementId: string) =>
    requests.post(`/Notifications/SendAnnouncementReminder/${announcementId}`),

  sendBirthdayWishes: () => requests.post("/Notifications/sendBirthdayWishes"),
};
