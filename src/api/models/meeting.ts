export interface MeetingModel {
  id: string;
  date: string;
  agenda: Agendum[];
  proposedDurationInMinutes: number;
}

interface Agendum {
  id: string;
  title: string;
  description: string;
}
