export interface MeetingModel {
  id: string;
  date: string;
  agenda: Agendum[];
  proposedDurationInMinutes: number;
}

export interface MinutesModel {
  id: string;
  content: string;
  dateOfMeeting: string;
}

interface Agendum {
  id: string;
  title: string;
  description: string;
}
