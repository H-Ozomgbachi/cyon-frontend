import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  Avatar,
  Tabs,
  Tab,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import {
  ArrowBack,
  CheckCircle,
  HowToVote,
  Person,
  EmojiEvents,
  Schedule,
  VerifiedUser,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { useParams } from "react-router-dom";
import { customHistory } from "../..";
import { ROUTES } from "../../routes";
import {
  ElectionStatus,
  Contest,
  Nominee,
  ContestResult,
} from "../../api/models/election";
import HeaderNav from "../shared/header-nav";
import MySkeleton from "../shared/loading-spinner/MySkeleton";
import {
  connectToElectionHub,
  disconnectFromElectionHub,
} from "../../helpers/signalR";
import "../admin/election/Election.css";

export default observer(function VotingInterface() {
  const { electionStore } = useStore();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedNominee, setSelectedNominee] = useState<string | null>(
    null
  );
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    contest: Contest | null;
    nominee: Nominee | null;
  }>({ open: false, contest: null, nominee: null });

  useEffect(() => {
    if (id) {
      electionStore.fetchElection(id).catch(() => {});
      electionStore.fetchResults(id).catch(() => {});
      electionStore.fetchMyVotedContests(id).catch(() => {});
      electionStore.checkVotingEligibility(id).catch(() => {});
      connectToElectionHub(id);
    }
    return () => {
      electionStore.clearVotedContests();
      electionStore.resetEligibility();
      disconnectFromElectionHub();
    };
  }, [electionStore, id]);

  // Auto-switch to newly published contest when results are published via SignalR
  useEffect(() => {
    const lastPublishedId = electionStore.lastPublishedContestId;
    const election = electionStore.currentElection;
    if (!lastPublishedId || !election) return;

    // Compute visible contests the same way as in render
    const sortedContests = (election.contests ?? [])
      .slice()
      .sort((a, b) => a.displayOrder - b.displayOrder);
    const activeContestId = election.activeContestId;
    const visibleContests = activeContestId
      ? sortedContests.filter((c) => c.id === activeContestId || c.isResultPublished)
      : sortedContests;

    // Find the index of the newly published contest
    const newTabIndex = visibleContests.findIndex((c) => c.id === lastPublishedId);
    if (newTabIndex >= 0) {
      setActiveTab(newTabIndex);
      setSelectedNominee(null);
    }

    // Clear so we don't keep switching
    electionStore.clearLastPublishedContestId();
  }, [electionStore.lastPublishedContestId, electionStore.currentElection, electionStore]);

  const election = electionStore.currentElection;

  if (electionStore.loadingCurrentElection || !election) {
    return (
      <Box>
        <HeaderNav />
        <Box sx={{ p: 2 }}>
          <MySkeleton count={3} />
        </Box>
      </Box>
    );
  }

  if (election.status !== ElectionStatus.Live) {
    return (
      <Box>
        <HeaderNav />
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mt: 4 }}>
            This election is not currently accepting votes.
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => customHistory.push(ROUTES.elections)}
          >
            Back to Elections
          </Button>
        </Box>
      </Box>
    );
  }

  // Check if user is eligible to vote (attendance-based restriction)
  const isEligible = electionStore.isEligibleToVote;
  const requiresAttendance = election.requiresAttendance;

  if (requiresAttendance && isEligible === false) {
    return (
      <Box>
        <HeaderNav />
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mt: 4, color: "error.main" }}>
            You are not eligible to vote in this election
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            This election requires you to be present at the meeting to vote.
            Please check in with the attendance register first.
          </Typography>
          {election.meetingDate && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Meeting date: {new Date(election.meetingDate).toLocaleDateString()}
            </Typography>
          )}
          <Button
            variant="outlined"
            sx={{ mt: 3 }}
            onClick={() => customHistory.push(ROUTES.elections)}
          >
            Back to Elections
          </Button>
        </Box>
      </Box>
    );
  }

  const sortedContests = (election.contests ?? [])
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder);

  // Get the active contest ID
  const activeContestId = election.activeContestId;
  
  // Visible contests: show active contest + published contests (for results)
  // If no active contest set, show all contests
  const visibleContests = activeContestId
    ? sortedContests.filter((c) => c.id === activeContestId || c.isResultPublished)
    : sortedContests;

  const currentContest = visibleContests[activeTab] ?? visibleContests[0];
  const isActiveContest = currentContest?.id === activeContestId;
  const isPublishedContest = currentContest?.isResultPublished === true;
  const hasVoted = currentContest
    ? electionStore.votedContests.has(currentContest.id)
    : false;

  // Get results for published contest
  const getContestResult = (contestId: string): ContestResult | undefined => {
    return electionStore.liveResults.find(r => r.contestId === contestId);
  };

  const handleVoteConfirm = () => {
    if (id && confirmDialog.contest && confirmDialog.nominee) {
      electionStore.castVote(
        id,
        confirmDialog.contest.id,
        confirmDialog.nominee.id
      );
    }
    setConfirmDialog({ open: false, contest: null, nominee: null });
    setSelectedNominee(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <HeaderNav />

      <Box sx={{ p: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => customHistory.push(ROUTES.elections)}
          sx={{ mb: 1 }}
        >
          Back
        </Button>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          {election.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {election.description}
        </Typography>
        
        {/* Show attendance verification status */}
        {requiresAttendance && isEligible && (
          <Chip
            icon={<VerifiedUser />}
            label="Attendance Verified"
            color="success"
            size="small"
            sx={{ mb: 2 }}
          />
        )}

        {/* Contest Tabs - show when there are multiple visible contests */}
        {visibleContests.length > 1 && (
          <Tabs
            value={activeTab}
            onChange={(_, v) => {
              setActiveTab(v);
              setSelectedNominee(null);
            }}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 2 }}
          >
            {visibleContests.map((contest) => (
              <Tab
                key={contest.id}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {contest.positionName}
                    {contest.isResultPublished ? (
                      <EmojiEvents sx={{ fontSize: 16, color: "#2196f3" }} />
                    ) : electionStore.votedContests.has(contest.id) ? (
                      <CheckCircle sx={{ fontSize: 16, color: "#4caf50" }} />
                    ) : contest.id === activeContestId ? (
                      <HowToVote sx={{ fontSize: 16, color: "#ff9800" }} />
                    ) : null}
                  </Box>
                }
              />
            ))}
          </Tabs>
        )}

        {/* Current Contest */}
        {currentContest && (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {currentContest.positionName}
              </Typography>
              {isPublishedContest && (
                <Chip label="Results Published" color="info" size="small" />
              )}
              {isActiveContest && !isPublishedContest && (
                <Chip label="Now Voting" color="warning" size="small" />
              )}
            </Box>

            {/* PUBLISHED CONTEST: Show Results */}
            {isPublishedContest && (
              <PublishedContestResults 
                contest={currentContest} 
                result={getContestResult(currentContest.id)} 
              />
            )}

            {/* ACTIVE CONTEST: Show Voting UI */}
            {!isPublishedContest && isActiveContest && (
              <>
                {hasVoted ? (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 4,
                      backgroundColor: "#e8f5e9",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <CheckCircle
                      sx={{ fontSize: 48, color: "#4caf50", mb: 1 }}
                    />
                    <Typography variant="h6" sx={{ color: "#2e7d32" }}>
                      Vote Cast Successfully!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      You have already voted for this position.
                    </Typography>
                  </Box>
                ) : (
                  <>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Select a nominee and cast your vote:
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr 1fr",
                      sm: "repeat(4, 1fr)",
                    },
                    gap: 2,
                    mb: 2,
                  }}
                >
                  {currentContest.nominees
                    ?.slice()
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((nominee) => (
                      <Card
                        key={nominee.id}
                        className={`nominee-card ${
                          selectedNominee === nominee.id ? "selected" : ""
                        }`}
                        onClick={() => setSelectedNominee(nominee.id)}
                        sx={{
                          textAlign: "center",
                          p: 2,
                          cursor: "pointer",
                        }}
                      >
                        <Avatar
                          src={nominee.photoUrl || undefined}
                          sx={{
                            width: 72,
                            height: 72,
                            mx: "auto",
                            mb: 1,
                            bgcolor: "rgba(0, 148, 50, 0.1)",
                          }}
                        >
                          <Person sx={{ fontSize: 36 }} />
                        </Avatar>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {nominee.fullName}
                        </Typography>
                        {nominee.bio && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {nominee.bio}
                          </Typography>
                        )}
                        {selectedNominee === nominee.id && (
                          <Chip
                            label="Selected"
                            color="success"
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        )}
                      </Card>
                    ))}
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<HowToVote />}
                  disabled={!selectedNominee}
                  color="success"
                  onClick={() => {
                    const nominee = currentContest.nominees?.find(
                      (n) => n.id === selectedNominee
                    );
                    if (nominee) {
                      setConfirmDialog({
                        open: true,
                        contest: currentContest,
                        nominee,
                      });
                    }
                  }}
                  sx={{ py: 1.5 }}
                >
                  Cast Vote
                </Button>
                  </>
                )}
              </>
            )}

            {/* NOT ACTIVE & NOT PUBLISHED: Coming Soon */}
            {!isPublishedContest && !isActiveContest && (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                <Schedule sx={{ fontSize: 48, color: "#9e9e9e", mb: 1 }} />
                <Typography variant="h6" sx={{ color: "#616161" }}>
                  Coming Soon
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Voting for this position has not started yet.
                </Typography>
              </Box>
            )}

            {/* Navigation between contests */}
            {visibleContests.length > 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Button
                  disabled={activeTab === 0}
                  onClick={() => {
                    setActiveTab(activeTab - 1);
                    setSelectedNominee(null);
                  }}
                >
                  Previous
                </Button>
                <Button
                  disabled={activeTab === visibleContests.length - 1}
                  onClick={() => {
                    setActiveTab(activeTab + 1);
                    setSelectedNominee(null);
                  }}
                >
                  Next
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>

      {/* Confirm Vote Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() =>
          setConfirmDialog({ open: false, contest: null, nominee: null })
        }
      >
        <DialogTitle>Confirm Your Vote</DialogTitle>
        <DialogContent>
          <Typography>
            You are voting for{" "}
            <strong>{confirmDialog.nominee?.fullName}</strong> for the
            position of{" "}
            <strong>{confirmDialog.contest?.positionName}</strong>.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setConfirmDialog({
                open: false,
                contest: null,
                nominee: null,
              })
            }
          >
            Cancel
          </Button>
          <Button
            onClick={handleVoteConfirm}
            variant="contained"
            color="success"
          >
            Confirm Vote
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

// Sub-component: Published Contest Results
interface PublishedContestResultsProps {
  contest: Contest;
  result?: ContestResult;
}

function PublishedContestResults({ contest, result }: PublishedContestResultsProps) {
  if (!result) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="text.secondary">Loading results...</Typography>
      </Box>
    );
  }

  const maxVotes = Math.max(...result.allNominees.map(n => n.votes), 1);

  return (
    <Box>
      {result.winner && (
        <Box
          sx={{
            textAlign: "center",
            py: 3,
            px: 2,
            mb: 2,
            backgroundColor: "#fff3e0",
            borderRadius: 2,
            border: "2px solid #ff9800",
          }}
        >
          <EmojiEvents sx={{ fontSize: 48, color: "#ff9800", mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#e65100" }}>
            Winner: {result.winner.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {result.winner.votes} votes ({result.winner.percentage}%)
            {result.isTie && " (Tie-breaker applied)"}
          </Typography>
        </Box>
      )}

      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Full Results ({result.totalVotes} total votes)
      </Typography>

      {result.allNominees.map((nominee) => (
        <Box key={nominee.nomineeId} sx={{ mb: 1.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                src={nominee.photoUrl || undefined}
                sx={{ width: 32, height: 32 }}
              >
                <Person sx={{ fontSize: 18 }} />
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {nominee.fullName}
              </Typography>
              {result.winner?.nomineeId === nominee.nomineeId && (
                <Chip label="Winner" color="warning" size="small" />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {nominee.votes} ({nominee.percentage}%)
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(nominee.votes / maxVotes) * 100}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": {
                backgroundColor:
                  result.winner?.nomineeId === nominee.nomineeId
                    ? "#ff9800"
                    : "#4caf50",
              },
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
