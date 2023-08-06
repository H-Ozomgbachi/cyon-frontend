export interface YearProgrammeModel {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  scope: string;
  year: string;
}

// Remove Later
export interface FoundTreasureDto {
  founderName: string;
  founderPhone: string;
}

export interface TreasureResultModel {
  id: string;
  founderName: string;
  founderPhone: string;
  dateAdded: string;
}
