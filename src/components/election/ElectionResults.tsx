import { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";
import {
  ArrowBack,
  EmojiEvents,
  Person,
  WarningAmber,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { useParams } from "react-router-dom";
import { customHistory } from "../..";
import { ROUTES } from "../../routes";
import {
  ElectionStatus,
  ContestResult,
  NomineeResult,
} from "../../api/models/election";
import HeaderNav from "../shared/header-nav";
import MySkeleton from "../shared/loading-spinner/MySkeleton";
import {
  connectToElectionHub,
  disconnectFromElectionHub,
} from "../../helpers/signalR";
import "../admin/election/Election.css";

export default observer(function ElectionResults() {
  const { electionStore } = useStore();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      electionStore.fetchElection(id).catch(() => {});
      electionStore.fetchResults(id).catch(() => {});
      connectToElectionHub(id);
    }
    return () => {
      disconnectFromElectionHub();
    };
  }, [electionStore, id]);

  const election = electionStore.currentElection;

  if (electionStore.loadingCurrentElection || electionStore.loadingResults) {
    return (
      <Box>
        <HeaderNav />
        <Box sx={{ p: 2 }}>
          <MySkeleton count={3} />
        </Box>
      </Box>
    );
  }

  if (!election) {
    return (
      <Box>
        <HeaderNav />
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Election not found.
          </Typography>
        </Box>
      </Box>
    );
  }

  const isLive = election.status === ElectionStatus.Live;
  const isPublished = election.status === ElectionStatus.ResultsPublished;

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
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {election.title} — Results
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {election.description}
            </Typography>
          </Box>
          <span
            className={`election-status-badge ${
              isLive
                ? "election-status-live"
                : "election-status-published"
            }`}
          >
            {isLive ? "Live Results" : "Final Results"}
          </span>
        </Box>

        {isLive && (
          <Box
            sx={{
              backgroundColor: "#e8f5e9",
              p: 1.5,
              borderRadius: 2,
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#4caf50",
                animation: "pulse-live 2s infinite",
              }}
            />
            <Typography variant="body2" sx={{ color: "#2e7d32" }}>
              Results are updating in real-time
            </Typography>
          </Box>
        )}

        {electionStore.liveResults.length === 0 ? (
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", py: 4 }}
          >
            No results available yet.
          </Typography>
        ) : (
          electionStore.liveResults.map((result) => (
            <ContestResultCard
              key={result.contestId}
              result={result}
              isPublished={isPublished}
              electionId={election.id}
            />
          ))
        )}
      </Box>
    </Box>
  );
});

interface ContestResultCardProps {
  result: ContestResult;
  isPublished: boolean;
  electionId: string;
}

const ContestResultCard = observer(function ContestResultCard({
  result,
  isPublished,
  electionId,
}: ContestResultCardProps) {
  const sortedNominees = (result.allNominees ?? [])
    .slice()
    .sort((a, b) => b.votes - a.votes);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {result.positionName}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Chip
              label={`${result.totalVotes} total vote(s)`}
              size="small"
              variant="outlined"
            />
            {result.isTie && (
              <span className="tie-indicator">
                <WarningAmber sx={{ fontSize: 14 }} />
                Tie
              </span>
            )}
          </Box>
        </Box>

        {/* Winner highlight */}
        {isPublished && result.winner && !result.isTie && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              backgroundColor: "rgba(150, 114, 23, 0.08)",
              p: 1.5,
              borderRadius: 2,
              mb: 2,
              border: "1px solid rgba(150, 114, 23, 0.3)",
            }}
          >
            <EmojiEvents sx={{ color: "rgb(150, 114, 23)", fontSize: 28 }} />
            <Avatar
              src={result.winner.photoUrl || undefined}
              sx={{ width: 40, height: 40 }}
            >
              <Person />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {result.winner.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Winner — {result.winner.votes} votes (
                {result.winner.percentage}%)
              </Typography>
            </Box>
          </Box>
        )}

        <Divider sx={{ mb: 2 }} />

        {/* All nominees with progress bars */}
        {sortedNominees.map((nominee, index) => (
          <NomineeResultRow
            key={nominee.nomineeId}
            nominee={nominee}
            isWinner={
              isPublished &&
              !result.isTie &&
              result.winner?.nomineeId === nominee.nomineeId
            }
            isPublished={isPublished}
            electionId={electionId}
            contestId={result.contestId}
          />
        ))}
      </CardContent>
    </Card>
  );
});

interface NomineeResultRowProps {
  nominee: NomineeResult;
  isWinner: boolean;
  isPublished: boolean;
  electionId: string;
  contestId: string;
}

const NomineeResultRow = observer(function NomineeResultRow({
  nominee,
  isWinner,
  isPublished,
  electionId,
  contestId,
}: NomineeResultRowProps) {
  const { commonStore } = useStore();

  const handleViewVoters = () => {
    if (isPublished) {
      commonStore.setModalContent(
        <VoterBreakdownView
          electionId={electionId}
          contestId={contestId}
          nomineeId={nominee.nomineeId}
          nomineeName={nominee.fullName}
        />,
        `Voters for ${nominee.fullName}`,
        true
      );
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src={nominee.photoUrl || undefined}
            sx={{ width: 32, height: 32 }}
          >
            <Person sx={{ fontSize: 16 }} />
          </Avatar>
          <Typography
            variant="body1"
            sx={{ fontWeight: isWinner ? 700 : 400 }}
          >
            {nominee.fullName}
            {isWinner && (
              <EmojiEvents
                sx={{
                  fontSize: 16,
                  color: "rgb(150, 114, 23)",
                  ml: 0.5,
                  verticalAlign: "middle",
                }}
              />
            )}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {nominee.votes} ({nominee.percentage}%)
          </Typography>
          {isPublished && (
            <Button
              size="small"
              variant="text"
              sx={{ fontSize: "0.7rem", minWidth: "auto" }}
              onClick={handleViewVoters}
            >
              Voters
            </Button>
          )}
        </Box>
      </Box>
      <div className="results-bar">
        <div
          className={`results-bar-fill ${isWinner ? "winner" : ""}`}
          style={{ width: `${nominee.percentage}%` }}
        />
      </div>
    </Box>
  );
});

// Inline voter breakdown for the results view
interface VoterBreakdownViewProps {
  electionId: string;
  contestId: string;
  nomineeId: string;
  nomineeName: string;
}

const VoterBreakdownView = observer(function VoterBreakdownView({
  electionId,
  contestId,
  nomineeId,
  nomineeName,
}: VoterBreakdownViewProps) {
  const { electionStore } = useStore();

  useEffect(() => {
    electionStore.fetchVoterBreakdown(electionId, contestId, nomineeId);
  }, [electionStore, electionId, contestId, nomineeId]);

  if (electionStore.loadingVoterBreakdown) {
    return <MySkeleton count={2} />;
  }

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Voters who selected {nomineeName} (
        {electionStore.voterBreakdown.length})
      </Typography>
      {electionStore.voterBreakdown.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No voters found.
        </Typography>
      ) : (
        electionStore.voterBreakdown.map((voter) => (
          <Box
            key={voter.userId}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
              borderBottom: "1px solid #eee",
            }}
          >
            <Typography variant="body2">{voter.fullName}</Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(voter.castAt).toLocaleString()}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
});
