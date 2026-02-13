import requests from "../main/apiConfig";
import {
  Election,
  Contest,
  ContestResult,
  VoterRecord,
  VoterBreakdownModel,
  CreateElectionDto,
  UpdateElectionDto,
  CreateContestDto,
  UpdateContestDto,
  CreateNomineeDto,
  UpdateNomineeDto,
  CastVoteDto,
  PublishedResultsModel,
} from "../models/election";

export const ElectionEndpoint = {
  // Admin: Election CRUD
  createElection: (payload: CreateElectionDto) =>
    requests.post<Election>("/elections", payload),

  getAllElections: () => requests.get<Election[]>("/elections"),

  getElection: (electionId: string) =>
    requests.get<Election>(`/elections/${electionId}`),

  updateElection: (electionId: string, payload: UpdateElectionDto) =>
    requests.put<Election>(`/elections/${electionId}`, payload),

  deleteElection: (electionId: string) =>
    requests.del(`/elections/${electionId}`),

  // Admin: Contest CRUD
  addContest: (electionId: string, payload: CreateContestDto) =>
    requests.post<Contest>(`/elections/${electionId}/contests`, payload),

  updateContest: (
    electionId: string,
    contestId: string,
    payload: UpdateContestDto
  ) =>
    requests.put(
      `/elections/${electionId}/contests/${contestId}`,
      payload
    ),

  deleteContest: (electionId: string, contestId: string) =>
    requests.del(`/elections/${electionId}/contests/${contestId}`),

  // Admin: Nominee CRUD
  addNominee: (
    electionId: string,
    contestId: string,
    payload: CreateNomineeDto
  ) =>
    requests.post(
      `/elections/${electionId}/contests/${contestId}/nominees`,
      payload
    ),

  updateNominee: (
    electionId: string,
    contestId: string,
    nomineeId: string,
    payload: UpdateNomineeDto
  ) =>
    requests.put(
      `/elections/${electionId}/contests/${contestId}/nominees/${nomineeId}`,
      payload
    ),

  deleteNominee: (
    electionId: string,
    contestId: string,
    nomineeId: string
  ) =>
    requests.del(
      `/elections/${electionId}/contests/${contestId}/nominees/${nomineeId}`
    ),

  // Admin: Status transitions
  goLive: (electionId: string) =>
    requests.post(`/elections/${electionId}/go-live`),

  closeElection: (electionId: string) =>
    requests.post(`/elections/${electionId}/close`),

  publishResults: (electionId: string) =>
    requests.post(`/elections/${electionId}/publish-results`),

  // Admin: Publish contest results (per-contest)
  publishContestResults: (electionId: string, contestId: string) =>
    requests.post<ContestResult>(`/elections/${electionId}/contests/${contestId}/publish-results`),

  // Admin: Add contest to live election
  addContestToLiveElection: (electionId: string, payload: CreateContestDto) =>
    requests.post<Contest>(`/elections/${electionId}/contests/add-live`, payload),

  // Admin: Contest activation (one contest at a time)
  activateContest: (electionId: string, contestId: string) =>
    requests.post(`/elections/${electionId}/contests/${contestId}/activate`),

  deactivateContest: (electionId: string) =>
    requests.post(`/elections/${electionId}/contests/deactivate`),

  // Admin: Voter breakdown
  getVoterBreakdown: (
    electionId: string,
    contestId: string,
    nomineeId: string
  ) =>
    requests.get<VoterBreakdownModel>(
      `/elections/${electionId}/contests/${contestId}/nominees/${nomineeId}/voters`
    ),

  // General endpoints
  getActiveElections: () =>
    requests.get<Election[]>("/elections/active"),

  getElectionResults: (electionId: string) =>
    requests.get<PublishedResultsModel>(`/elections/${electionId}/results`),

  castVote: (electionId: string, payload: CastVoteDto) =>
    requests.post(`/elections/${electionId}/vote`, payload),

  getMyVotedContests: (electionId: string) =>
    requests.get<string[]>(`/elections/${electionId}/my-votes`),

  /** Check if current user is eligible to vote (returns true if no attendance required or user has checked in) */
  checkVotingEligibility: (electionId: string) =>
    requests.get<boolean>(`/elections/${electionId}/eligibility`),
};
