export interface OccupationModel {
  id: string;
  jobTitle: string;
  company: string;
  isStudent: boolean;
  isUnemployed: boolean;
  canDo: string;
  userId: string;
}

export interface OccupationPayload {
  id: string;
  jobTitle: string;
  company: string;
  isStudent: boolean;
  isUnemployed: boolean;
  canDo: string;
}
