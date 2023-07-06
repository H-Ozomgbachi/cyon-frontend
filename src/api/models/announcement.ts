export interface AnnouncementModel {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  dateAdded: string;
  readBy: string;
}

export interface CreateOrUpdateAnnouncement {
  id?: string;
  title: string;
  content: string;
  isActive?: boolean;
}
