import { makeAutoObservable, runInAction } from "mobx";
import agent from "../main/apiAgent";
import { store } from "../main/appStore";
import {
  Election,
  Contest,
  ContestResult,
  VoterRecord,
  CreateElectionDto,
  UpdateElectionDto,
  CreateContestDto,
  UpdateContestDto,
  CreateNomineeDto,
  UpdateNomineeDto,
  ElectionStatus,
  VoteCastEvent,
  PublishedResultsModel,
} from "../models/election";

export class ElectionStore {
  elections: Election[] = [];
  currentElection: Election | null = null;
  activeElections: Election[] = [];
  liveResults: ContestResult[] = [];
  votedContests: Set<string> = new Set();
  voterBreakdown: VoterRecord[] = [];

  loadingElections = false;
  loadingCurrentElection = false;
  loadingActiveElections = false;
  loadingResults = false;
  loadingVoterBreakdown = false;

  // Real-time: track the last published contest ID for auto-switching tabs
  lastPublishedContestId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Clear the last published contest ID after navigating to it
  clearLastPublishedContestId = () => {
    this.lastPublishedContestId = null;
  };

  // Admin: Fetch all elections
  fetchElections = async () => {
    try {
      this.loadingElections = true;
      const result = await agent.election.getAllElections();
      runInAction(() => {
        this.elections = result;
      });
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => {
        this.loadingElections = false;
      });
    }
  };

  // Fetch single election
  fetchElection = async (id: string) => {
    try {
      this.loadingCurrentElection = true;
      const result = await agent.election.getElection(id);
      runInAction(() => {
        this.currentElection = result;
      });
      return result;
    } catch (error) {
      console.error("Failed to fetch election:", error);
    } finally {
      runInAction(() => {
        this.loadingCurrentElection = false;
      });
    }
  };

  // Create election
  createElection = async (values: CreateElectionDto) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.createElection(values);
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Election created successfully");
      this.fetchElections();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Update election
  updateElection = async (id: string, values: UpdateElectionDto) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.updateElection(id, values);
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Election updated successfully");
      this.fetchElection(id);
      this.fetchElections();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Delete election
  deleteElection = async (id: string) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.deleteElection(id);
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Election deleted successfully");
      this.fetchElections();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Add contest
  addContest = async (electionId: string, values: CreateContestDto) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.addContest(electionId, values);
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Contest added successfully");
      this.fetchElection(electionId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Update contest
  updateContest = async (
    electionId: string,
    contestId: string,
    values: UpdateContestDto
  ) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.updateContest(electionId, contestId, values);
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Contest updated successfully");
      this.fetchElection(electionId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Delete contest
  deleteContest = async (electionId: string, contestId: string) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.deleteContest(electionId, contestId);
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Contest deleted successfully");
      this.fetchElection(electionId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Add nominee
  addNominee = async (
    electionId: string,
    contestId: string,
    values: CreateNomineeDto
  ) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.addNominee(electionId, contestId, values);
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Nominee added successfully");
      this.fetchElection(electionId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Update nominee
  updateNominee = async (
    electionId: string,
    contestId: string,
    nomineeId: string,
    values: UpdateNomineeDto
  ) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.updateNominee(
        electionId,
        contestId,
        nomineeId,
        values
      );
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Nominee updated successfully");
      this.fetchElection(electionId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Delete nominee
  deleteNominee = async (
    electionId: string,
    contestId: string,
    nomineeId: string
  ) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.deleteNominee(electionId, contestId, nomineeId);
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Nominee removed successfully");
      this.fetchElection(electionId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Status transitions
  goLive = async (electionId: string) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.goLive(electionId);
      store.commonStore.setAlertText("Election is now live!");
      this.fetchElection(electionId);
      this.fetchElections();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  closeElection = async (electionId: string) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.closeElection(electionId);
      store.commonStore.setAlertText("Election has been closed");
      this.fetchElection(electionId);
      this.fetchElections();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  publishResults = async (electionId: string) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.publishResults(electionId);
      store.commonStore.setAlertText("Results have been published");
      this.fetchElection(electionId);
      this.fetchElections();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Publish results for a single contest
  publishContestResults = async (electionId: string, contestId: string) => {
    try {
      store.commonStore.setLoading(true);
      const result = await agent.election.publishContestResults(electionId, contestId);
      store.commonStore.setAlertText("Contest results have been published");
      // Update the contest in the current election
      runInAction(() => {
        if (this.currentElection) {
          const contestIndex = this.currentElection.contests.findIndex(c => c.id === contestId);
          if (contestIndex >= 0) {
            this.currentElection.contests[contestIndex].isResultPublished = true;
            this.currentElection.contests[contestIndex].resultPublishedAt = new Date().toISOString();
          }
        }
        // Update live results with this contest
        const existingIndex = this.liveResults.findIndex(r => r.contestId === contestId);
        if (existingIndex >= 0) {
          this.liveResults[existingIndex] = result;
        } else {
          this.liveResults.push(result);
        }
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Add contest to live election
  addContestToLiveElection = async (electionId: string, dto: { positionName: string; description?: string; displayOrder?: number }) => {
    try {
      store.commonStore.setLoading(true);
      const contest = await agent.election.addContestToLiveElection(electionId, dto);
      store.commonStore.setModalVisible(false);
      store.commonStore.setAlertText("Contest added successfully");
      runInAction(() => {
        if (this.currentElection && this.currentElection.id === electionId) {
          this.currentElection.contests.push(contest);
        }
      });
      return contest;
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // General: Active elections
  fetchActiveElections = async () => {
    try {
      this.loadingActiveElections = true;
      const result = await agent.election.getActiveElections();
      runInAction(() => {
        this.activeElections = result ?? [];
      });
    } catch (error) {
      console.error("Failed to fetch active elections:", error);
    } finally {
      runInAction(() => {
        this.loadingActiveElections = false;
      });
    }
  };

  // Results
  fetchResults = async (electionId: string) => {
    try {
      this.loadingResults = true;
      const result = await agent.election.getElectionResults(electionId);
      runInAction(() => {
        this.liveResults = result?.contestResults ?? [];
      });
    } catch (error) {
      console.error("Failed to fetch election results:", error);
    } finally {
      runInAction(() => {
        this.loadingResults = false;
      });
    }
  };

  // Cast vote
  castVote = async (
    electionId: string,
    contestId: string,
    nomineeId: string
  ) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.castVote(electionId, { contestId, nomineeId });
      runInAction(() => {
        this.votedContests.add(contestId);
      });
      store.commonStore.setAlertText("Vote cast successfully!");
      this.fetchResults(electionId);
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Fetch user's voted contests for an election
  fetchMyVotedContests = async (electionId: string) => {
    try {
      const votedIds = await agent.election.getMyVotedContests(electionId);
      runInAction(() => {
        (votedIds ?? []).forEach((id: string) => this.votedContests.add(id));
      });
    } catch (error) {
      console.error("Failed to fetch voted contests:", error);
    }
  };

  // Admin: Activate a specific contest for voting
  activateContest = async (electionId: string, contestId: string) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.activateContest(electionId, contestId);
      store.commonStore.setAlertText("Contest activated for voting");
      this.fetchElection(electionId);
      this.fetchElections();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Admin: Deactivate all contests
  deactivateContest = async (electionId: string) => {
    try {
      store.commonStore.setLoading(true);
      await agent.election.deactivateContest(electionId);
      store.commonStore.setAlertText("Contests deactivated");
      this.fetchElection(electionId);
      this.fetchElections();
    } catch (error) {
      throw error;
    } finally {
      store.commonStore.setLoading(false);
    }
  };

  // Voter breakdown (admin)
  fetchVoterBreakdown = async (
    electionId: string,
    contestId: string,
    nomineeId: string
  ) => {
    try {
      this.loadingVoterBreakdown = true;
      const result = await agent.election.getVoterBreakdown(
        electionId,
        contestId,
        nomineeId
      );
      runInAction(() => {
        this.voterBreakdown = result.voters;
      });
    } catch (error) {
      throw error;
    } finally {
      runInAction(() => {
        this.loadingVoterBreakdown = false;
      });
    }
  };

  // SignalR handlers
  handleElectionUpdated = (election: Election) => {
    runInAction(() => {
      this.currentElection = election;
      // Update in lists
      const idx = this.elections.findIndex((e) => e.id === election.id);
      if (idx >= 0) this.elections[idx] = election;
      const activeIdx = this.activeElections.findIndex(
        (e) => e.id === election.id
      );
      if (activeIdx >= 0) this.activeElections[activeIdx] = election;
    });
  };

  handleVoteCast = (data: VoteCastEvent) => {
    runInAction(() => {
      const result = this.liveResults.find(
        (r) => r.contestId === data.contestId
      );
      if (result) {
        result.totalVotes = data.totalVotes;
        (data.nomineeVotes ?? []).forEach((nv) => {
          const nominee = (result.allNominees ?? []).find(
            (n) => n.nomineeId === nv.nomineeId
          );
          if (nominee) {
            nominee.votes = nv.votes;
            nominee.percentage =
              data.totalVotes > 0
                ? Math.round((nv.votes / data.totalVotes) * 100)
                : 0;
          }
        });
      }
    });
  };

  handleResultsPublished = (results: PublishedResultsModel | ContestResult[]) => {
    runInAction(() => {
      // Handle both PublishedResultsModel wrapper and direct ContestResult[]
      if (Array.isArray(results)) {
        this.liveResults = results;
      } else {
        this.liveResults = results?.contestResults ?? [];
      }
      if (this.currentElection) {
        this.currentElection.status = ElectionStatus.ResultsPublished;
      }
    });
  };

  // Handle real-time contest creation (for live elections)
  handleContestCreated = (contest: Contest) => {
    runInAction(() => {
      if (this.currentElection) {
        // Add to current election if not already present
        const exists = this.currentElection.contests.some(c => c.id === contest.id);
        if (!exists) {
          this.currentElection.contests.push(contest);
          // Sort by display order
          this.currentElection.contests.sort((a, b) => a.displayOrder - b.displayOrder);
        }
      }
    });
  };

  // Handle real-time contest results published
  handleContestResultsPublished = (contestResult: ContestResult) => {
    runInAction(() => {
      // Mark the contest as published in current election
      if (this.currentElection) {
        const contest = this.currentElection.contests.find(c => c.id === contestResult.contestId);
        if (contest) {
          contest.isResultPublished = true;
          contest.resultPublishedAt = new Date().toISOString();
        }
      }
      // Add or update the result in liveResults
      const existingIdx = this.liveResults.findIndex(r => r.contestId === contestResult.contestId);
      if (existingIdx >= 0) {
        this.liveResults[existingIdx] = contestResult;
      } else {
        this.liveResults.push(contestResult);
      }
      // Set last published for auto-switching tabs in VotingInterface
      this.lastPublishedContestId = contestResult.contestId;
    });
  };

  // Mark contest as voted (used when loading user's existing votes)
  markContestVoted = (contestId: string) => {
    this.votedContests.add(contestId);
  };

  clearVotedContests = () => {
    this.votedContests.clear();
  };

  // Helper: check if election can go live
  canGoLive = (election: Election): boolean => {
    return (
      election.status === ElectionStatus.Draft &&
      election.contests.length > 0 &&
      election.contests.every((c) => c.nominees.length > 0)
    );
  };
}
