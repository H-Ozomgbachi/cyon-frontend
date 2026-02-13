import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import {
  ArrowBack,
  Add,
  Edit,
  Delete,
  PlayArrow,
  Stop,
  Publish,
  Person,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { useParams } from "react-router-dom";
import { customHistory } from "../../..";
import { ROUTES } from "../../../routes";
import {
  ElectionStatus,
  ElectionStatusLabels,
  Contest,
  Nominee,
} from "../../../api/models/election";
import HeaderNav from "../../shared/header-nav";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import CreateOrUpdateElection from "./CreateOrUpdateElection";
import CreateOrUpdateContest from "./CreateOrUpdateContest";
import CreateOrUpdateNominee from "./CreateOrUpdateNominee";
import "./Election.css";

export default observer(function ElectionBuilder() {
  const { electionStore, commonStore } = useStore();
  const { id } = useParams<{ id: string }>();
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
    action: () => void;
  }>({ open: false, title: "", message: "", action: () => {} });

  useEffect(() => {
    if (id) {
      electionStore.fetchElection(id);
    }
  }, [electionStore, id]);

  const election = electionStore.currentElection;
  const isDraft = election?.status === ElectionStatus.Draft;
  const isLive = election?.status === ElectionStatus.Live;
  const isClosed = election?.status === ElectionStatus.Closed;
  const isPublished =
    election?.status === ElectionStatus.ResultsPublished;

  const handleGoLive = () => {
    setConfirmDialog({
      open: true,
      title: "Go Live",
      message:
        "Are you sure you want to make this election live? Voting will begin immediately and the election can no longer be edited.",
      action: () => {
        if (id) electionStore.goLive(id);
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleClose = () => {
    setConfirmDialog({
      open: true,
      title: "Close Election",
      message:
        "Are you sure you want to close this election? No more votes will be accepted.",
      action: () => {
        if (id) electionStore.closeElection(id);
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handlePublish = () => {
    setConfirmDialog({
      open: true,
      title: "Publish Results",
      message:
        "Are you sure you want to publish the results? They will become visible to all members.",
      action: () => {
        if (id) electionStore.publishResults(id);
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleDeleteElection = () => {
    setConfirmDialog({
      open: true,
      title: "Delete Election",
      message:
        "Are you sure you want to delete this election? This action cannot be undone.",
      action: () => {
        if (id) {
          electionStore.deleteElection(id).then(() => {
            customHistory.push(ROUTES.adminPanel);
          });
        }
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleDeleteContest = (contestId: string) => {
    setConfirmDialog({
      open: true,
      title: "Delete Contest",
      message: "Are you sure you want to delete this contest and all its nominees?",
      action: () => {
        if (id) electionStore.deleteContest(id, contestId);
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleDeleteNominee = (contestId: string, nomineeId: string) => {
    setConfirmDialog({
      open: true,
      title: "Remove Nominee",
      message: "Are you sure you want to remove this nominee?",
      action: () => {
        if (id) electionStore.deleteNominee(id, contestId, nomineeId);
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleActivateContest = (contestId: string, contestName: string) => {
    setConfirmDialog({
      open: true,
      title: "Activate Contest",
      message: `Activate "${contestName}" for voting? Only this contest will accept votes.`,
      action: () => {
        if (id) electionStore.activateContest(id, contestId);
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleDeactivateContest = () => {
    setConfirmDialog({
      open: true,
      title: "Deactivate Contest",
      message: "Deactivate the current contest? No contest will accept votes until you activate one.",
      action: () => {
        if (id) electionStore.deactivateContest(id);
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handlePublishContestResults = (contestId: string, contestName: string) => {
    setConfirmDialog({
      open: true,
      title: "Publish Contest Results",
      message: `Publish results for "${contestName}"? Results will become visible to all members.`,
      action: async () => {
        if (id) {
          await electionStore.publishContestResults(id, contestId);
        }
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const handleAddContestToLive = () => {
    if (!id) return;
    commonStore.setModalContent(
      <CreateOrUpdateContest
        electionId={id}
        contest={null}
        nextOrder={(election?.contests?.length || 0) + 1}
        isLiveElection={true}
      />,
      "Add Contest to Live Election",
      true
    );
  };

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

  return (
    <Box>
      <HeaderNav />

      <Box sx={{ p: 2 }}>
        {/* Back button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => customHistory.push(ROUTES.adminPanel)}
          sx={{ mb: 2 }}
        >
          Back to Admin
        </Button>

        {/* Election Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {election.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 1 }}>
              {election.description}
            </Typography>
            <span
              className={`election-status-badge ${
                election.status === ElectionStatus.Draft
                  ? "election-status-draft"
                  : election.status === ElectionStatus.Live
                  ? "election-status-live"
                  : election.status === ElectionStatus.Closed
                  ? "election-status-closed"
                  : "election-status-published"
              }`}
            >
              {ElectionStatusLabels[election.status]}
            </span>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {isDraft && (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Edit />}
                  onClick={() =>
                    commonStore.setModalContent(
                      <CreateOrUpdateElection election={election} />,
                      "Edit Election",
                      true
                    )
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={handleDeleteElection}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<PlayArrow />}
                  color="success"
                  disabled={!electionStore.canGoLive(election)}
                  onClick={handleGoLive}
                >
                  Go Live
                </Button>
              </>
            )}
            {isLive && (
              <Button
                variant="contained"
                size="small"
                startIcon={<Stop />}
                color="warning"
                onClick={handleClose}
              >
                Close Voting
              </Button>
            )}
            {isClosed && (
              <Button
                variant="contained"
                size="small"
                startIcon={<Publish />}
                color="info"
                onClick={handlePublish}
              >
                Publish Results
              </Button>
            )}
            {isPublished && (
              <Button
                variant="outlined"
                size="small"
                onClick={() =>
                  customHistory.push(
                    `${ROUTES.electionResults}/${election.id}`
                  )
                }
              >
                View Results
              </Button>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Contests Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Contests ({election.contests?.length || 0})
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {isLive && election.activeContestId && (
              <Button
                variant="outlined"
                size="small"
                color="warning"
                startIcon={<RadioButtonUnchecked />}
                onClick={handleDeactivateContest}
              >
                Deactivate
              </Button>
            )}
            {isLive && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<Add />}
                onClick={handleAddContestToLive}
              >
                Add Contest
              </Button>
            )}
            {isDraft && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<Add />}
                onClick={() =>
                  commonStore.setModalContent(
                    <CreateOrUpdateContest
                      electionId={election.id}
                      contest={null}
                      nextOrder={(election.contests?.length || 0) + 1}
                    />,
                    "Add Contest",
                    true
                  )
                }
              >
                Add Contest
              </Button>
            )}
          </Box>
        </Box>

        {election.contests
          ?.slice()
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((contest) => (
            <ContestCard
              key={contest.id}
              contest={contest}
              electionId={election.id}
              isDraft={isDraft}
              isLive={isLive}
              isClosed={isClosed}
              isPublished={isPublished}
              activeContestId={election.activeContestId}
              onDeleteContest={handleDeleteContest}
              onDeleteNominee={handleDeleteNominee}
              onActivateContest={handleActivateContest}
              onPublishContestResults={handlePublishContestResults}
            />
          ))}

        {(!election.contests || election.contests.length === 0) && (
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", py: 4 }}
          >
            No contests added yet. Add a contest to get started.
          </Typography>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() =>
          setConfirmDialog((prev) => ({ ...prev, open: false }))
        }
      >
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <Typography>{confirmDialog.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setConfirmDialog((prev) => ({ ...prev, open: false }))
            }
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDialog.action}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

// Contest Card Sub-component
interface ContestCardProps {
  contest: Contest;
  electionId: string;
  isDraft: boolean;
  isLive: boolean;
  isClosed: boolean;
  isPublished: boolean;
  activeContestId?: string;
  onDeleteContest: (contestId: string) => void;
  onDeleteNominee: (contestId: string, nomineeId: string) => void;
  onActivateContest: (contestId: string, contestName: string) => void;
  onPublishContestResults: (contestId: string, contestName: string) => void;
}

const ContestCard = observer(function ContestCard({
  contest,
  electionId,
  isDraft,
  isLive,
  isClosed,
  isPublished,
  activeContestId,
  onDeleteContest,
  onDeleteNominee,
  onActivateContest,
  onPublishContestResults,
}: ContestCardProps) {
  const { commonStore } = useStore();
  const maxNominees = 4;
  // Allow adding nominees: in draft, or in live if contest is not active and not published
  const canAddNominee = (
    (isDraft || (isLive && activeContestId !== contest.id && !contest.isResultPublished))
    && (contest.nominees?.length || 0) < maxNominees
  );
  const isActiveContest = activeContestId === contest.id;
  const canPublishContest = (isLive || isClosed) && !contest.isResultPublished;

  return (
    <Card sx={{ 
      mb: 2, 
      border: isActiveContest 
        ? "2px solid #4caf50" 
        : contest.isResultPublished 
        ? "2px solid #2196f3" 
        : "1px solid #e0e0e0" 
    }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {contest.positionName}
              </Typography>
              {isActiveContest && (
                <span className="election-status-badge election-status-live" style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                  Active
                </span>
              )}
              {contest.isResultPublished && (
                <span className="election-status-badge election-status-published" style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                  Results Published
                </span>
              )}
            </Box>
            <Typography variant="caption" color="text.secondary">
              Order: {contest.displayOrder} &bull;{" "}
              {contest.nominees?.length || 0}/{maxNominees} nominees
              {contest.resultPublishedAt && (
                <> &bull; Published: {new Date(contest.resultPublishedAt).toLocaleDateString()}</>
              )}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {canPublishContest && (
              <Button
                size="small"
                variant="outlined"
                color="info"
                startIcon={<Publish />}
                onClick={() => onPublishContestResults(contest.id, contest.positionName)}
                sx={{ mr: 1 }}
              >
                Publish Results
              </Button>
            )}
            {isLive && !isActiveContest && !contest.isResultPublished && (
              <IconButton
                size="small"
                color="success"
                title="Activate this contest for voting"
                onClick={() => onActivateContest(contest.id, contest.positionName)}
              >
                <RadioButtonChecked fontSize="small" />
              </IconButton>
            )}
            {isDraft && (
              <>
                <IconButton
                  size="small"
                  onClick={() =>
                    commonStore.setModalContent(
                      <CreateOrUpdateContest
                        electionId={electionId}
                        contest={contest}
                        nextOrder={contest.displayOrder}
                      />,
                      "Edit Contest",
                      true
                    )
                  }
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDeleteContest(contest.id)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 1 }} />

        {/* Nominees */}
        <Grid container spacing={1}>
          {contest.nominees
            ?.slice()
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((nominee) => (
              <Grid item xs={6} sm={3} key={nominee.id}>
                <NomineeCard
                  nominee={nominee}
                  electionId={electionId}
                  contestId={contest.id}
                  isDraft={isDraft}
                  isPublished={isPublished}
                  onDelete={onDeleteNominee}
                />
              </Grid>
            ))}
        </Grid>

        {canAddNominee && (
          <Button
            size="small"
            startIcon={<Add />}
            sx={{ mt: 1 }}
            onClick={() =>
              commonStore.setModalContent(
                <CreateOrUpdateNominee
                  electionId={electionId}
                  contestId={contest.id}
                  nominee={null}
                  nextOrder={(contest.nominees?.length || 0) + 1}
                />,
                "Add Nominee",
                true
              )
            }
          >
            Add Nominee
          </Button>
        )}

        {!canAddNominee &&
          isDraft &&
          (contest.nominees?.length || 0) >= maxNominees && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              Maximum {maxNominees} nominees reached
            </Typography>
          )}
      </CardContent>
    </Card>
  );
});

// Nominee Card Sub-component
interface NomineeCardProps {
  nominee: Nominee;
  electionId: string;
  contestId: string;
  isDraft: boolean;
  isPublished: boolean;
  onDelete: (contestId: string, nomineeId: string) => void;
}

const NomineeCard = observer(function NomineeCard({
  nominee,
  electionId,
  contestId,
  isDraft,
  isPublished,
  onDelete,
}: NomineeCardProps) {
  const { commonStore, electionStore } = useStore();

  return (
    <Card
      variant="outlined"
      sx={{
        p: 1,
        textAlign: "center",
        position: "relative",
      }}
    >
      <Avatar
        src={nominee.photoUrl || undefined}
        sx={{
          width: 56,
          height: 56,
          mx: "auto",
          mb: 0.5,
          bgcolor: "rgba(0, 148, 50, 0.1)",
        }}
      >
        <Person />
      </Avatar>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {nominee.fullName}
      </Typography>
      {nominee.bio && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {nominee.bio}
        </Typography>
      )}

      {isDraft && (
        <Box sx={{ mt: 0.5, display: "flex", justifyContent: "center", gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={() =>
              commonStore.setModalContent(
                <CreateOrUpdateNominee
                  electionId={electionId}
                  contestId={contestId}
                  nominee={nominee}
                  nextOrder={nominee.displayOrder}
                />,
                "Edit Nominee",
                true
              )
            }
          >
            <Edit sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(contestId, nominee.id)}
          >
            <Delete sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      )}

      {isPublished && (
        <Button
          size="small"
          variant="text"
          sx={{ mt: 0.5, fontSize: "0.7rem" }}
          onClick={() =>
            electionStore.fetchVoterBreakdown(electionId, contestId, nominee.id)
          }
        >
          Voters
        </Button>
      )}
    </Card>
  );
});
