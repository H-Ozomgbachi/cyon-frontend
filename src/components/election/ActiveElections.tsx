import { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import { HowToVote, BarChart } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import {
  ElectionStatus,
  ElectionStatusLabels,
  Election,
} from "../../api/models/election";
import { customHistory } from "../..";
import { ROUTES } from "../../routes";
import MySkeleton from "../shared/loading-spinner/MySkeleton";
import NoResult from "../shared/no-result";
import SlideAnimation from "../shared/animate-content/SlideAnimation";
import "../admin/election/Election.css";

export default observer(function ActiveElections() {
  const { electionStore } = useStore();

  useEffect(() => {
    electionStore.fetchActiveElections();
  }, [electionStore]);

  const getStatusClass = (status: ElectionStatus) => {
    switch (status) {
      case ElectionStatus.Live:
        return "election-status-live";
      case ElectionStatus.ResultsPublished:
        return "election-status-published";
      default:
        return "";
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Elections
        </Typography>

        {electionStore.loadingActiveElections ? (
          <MySkeleton count={3} />
        ) : electionStore.activeElections.length === 0 ? (
          <NoResult title="No active elections at the moment" />
        ) : (
          <Grid container spacing={2}>
            {electionStore.activeElections.map((election) => (
              <Grid item xs={12} sm={6} md={4} key={election.id}>
                <ElectionCard
                  election={election}
                  statusClass={getStatusClass(election.status)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
});

interface ElectionCardProps {
  election: Election;
  statusClass: string;
}

const ElectionCard = observer(function ElectionCard({
  election,
  statusClass,
}: ElectionCardProps) {
  const isLive = election.status === ElectionStatus.Live;
  const isPublished = election.status === ElectionStatus.ResultsPublished;

  return (
    <SlideAnimation>
      <Card
        sx={{
          height: "100%",
          cursor: "pointer",
          transition: "all 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 4,
          },
        }}
        onClick={() =>
          isLive
            ? customHistory.push(`${ROUTES.electionVote}/${election.id}`)
            : customHistory.push(
                `${ROUTES.electionResults}/${election.id}`
              )
        }
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
              {election.title}
            </Typography>
            <span className={`election-status-badge ${statusClass}`}>
              {ElectionStatusLabels[election.status]}
            </span>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {election.description}
          </Typography>

          <Chip
            label={`${election.contests?.length || 0} position(s)`}
            size="small"
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Box>
            {isLive && (
              <Button
                variant="contained"
                fullWidth
                startIcon={<HowToVote />}
                color="success"
                onClick={(e) => {
                  e.stopPropagation();
                  customHistory.push(
                    `${ROUTES.electionVote}/${election.id}`
                  );
                }}
              >
                Vote Now
              </Button>
            )}
            {isPublished && (
              <Button
                variant="contained"
                fullWidth
                startIcon={<BarChart />}
                color="info"
                onClick={(e) => {
                  e.stopPropagation();
                  customHistory.push(
                    `${ROUTES.electionResults}/${election.id}`
                  );
                }}
              >
                View Results
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </SlideAnimation>
  );
});
