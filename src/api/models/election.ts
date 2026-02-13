export enum ElectionStatus {
  Draft = 0,
  Live = 1,
  Closed = 2,
  ResultsPublished = 3,
}

export interface Election {
  id: string;
  title: string;
  description: string;
  status: ElectionStatus;
  startAt?: string;
  endAt?: string;
  publishedAt?: string;
  activeContestId?: string;
  contests: Contest[];
}

export interface Contest {
  id: string;
  positionName: string;
  description?: string;
  displayOrder: number;
  isResultPublished: boolean;
  resultPublishedAt?: string;
  nominees: Nominee[];
}

export interface Nominee {
  id: string;
  fullName: string;
  bio?: string;
  photoUrl?: string;
  displayOrder: number;
}

export interface ContestResult {
  contestId: string;
  positionName: string;
  totalVotes: number;
  isTie: boolean;
  winner?: NomineeResult;
  allNominees: NomineeResult[];
}

export interface PublishedResultsModel {
  electionId: string;
  electionTitle: string;
  publishedAt: string;
  publishedBy: string;
  contestResults: ContestResult[];
}

export interface NomineeResult {
  nomineeId: string;
  fullName: string;
  photoUrl?: string;
  votes: number;
  percentage: number;
}

export interface VoterRecord {
  userId: string;
  fullName: string;
  email: string;
  uniqueCode: string;
  departmentName: string;
  castAt: string;
}

export interface VoterBreakdownModel {
  contestId: string;
  positionName: string;
  nomineeId: string;
  nomineeName: string;
  totalVoters: number;
  voters: VoterRecord[];
}

// DTOs
export interface CreateElectionDto {
  title: string;
  description: string;
  startAt?: string;
  endAt?: string;
}

export interface UpdateElectionDto extends CreateElectionDto {
  id: string;
}

export interface CreateContestDto {
  positionName: string;
  description?: string;
  displayOrder?: number;
}

export interface UpdateContestDto extends CreateContestDto {
  id: string;
}

export interface CreateNomineeDto {
  fullName: string;
  bio?: string;
  photoUrl?: string;
  displayOrder: number;
}

export interface UpdateNomineeDto extends CreateNomineeDto {
  id: string;
}

export interface CastVoteDto {
  contestId: string;
  nomineeId: string;
}

export interface VoteCastEvent {
  contestId: string;
  totalVotes: number;
  nomineeVotes: { nomineeId: string; votes: number }[];
}

export const ElectionStatusLabels: Record<ElectionStatus, string> = {
  [ElectionStatus.Draft]: "Draft",
  [ElectionStatus.Live]: "Live",
  [ElectionStatus.Closed]: "Closed",
  [ElectionStatus.ResultsPublished]: "Results Published",
};

export const ElectionStatusColors: Record<ElectionStatus, string> = {
  [ElectionStatus.Draft]: "#9e9e9e",
  [ElectionStatus.Live]: "#4caf50",
  [ElectionStatus.Closed]: "#ff9800",
  [ElectionStatus.ResultsPublished]: "#2196f3",
};
