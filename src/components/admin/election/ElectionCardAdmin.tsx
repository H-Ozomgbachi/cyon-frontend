import { Box, Chip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { People } from "@mui/icons-material";
import { Election, ElectionStatus, ElectionStatusLabels } from "../../../api/models/election";
import SlideAnimation from "../../shared/animate-content/SlideAnimation";
import { CompleteDateFormatter } from "../../../helpers/formatters";
import { customHistory } from "../../..";
import { ROUTES } from "../../../routes";
import "../election/Election.css";

interface Props {
  data: Election;
}

export default observer(function ElectionCardAdmin({ data }: Props) {
  const statusClass = () => {
    switch (data.status) {
      case ElectionStatus.Draft:
        return "election-status-draft";
      case ElectionStatus.Live:
        return "election-status-live";
      case ElectionStatus.Closed:
        return "election-status-closed";
      case ElectionStatus.ResultsPublished:
        return "election-status-published";
      default:
        return "";
    }
  };

  const handleClick = () => {
    customHistory.push(`${ROUTES.electionBuilder}/${data.id}`);
  };

  return (
    <SlideAnimation>
      <div onClick={handleClick}>
        <Box
          sx={{
            mb: 1,
            p: 1.5,
            cursor: "pointer",
            borderRadius: 2,
          }}
          className="paper-bg election-card-admin"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.1rem",
                fontWeight: 600,
                flex: 1,
              }}
            >
              {data.title}
            </Typography>
            <span className={`election-status-badge ${statusClass()}`}>
              {ElectionStatusLabels[data.status]}
            </span>
          </Box>

          <Typography
            sx={{
              fontSize: "0.85rem",
              color: "text.secondary",
              mb: 1,
            }}
          >
            {data.description}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label={`${data.contests?.length || 0} contest(s)`}
              size="small"
              variant="outlined"
            />
            {data.requiresAttendance && (
              <Chip
                icon={<People />}
                label="Attendance Required"
                size="small"
                color="warning"
                variant="outlined"
              />
            )}
            {data.startAt && (
              <Chip
                label={`Start: ${CompleteDateFormatter(data.startAt)}`}
                size="small"
                variant="outlined"
                color="primary"
              />
            )}
            {data.endAt && (
              <Chip
                label={`End: ${CompleteDateFormatter(data.endAt)}`}
                size="small"
                variant="outlined"
                color="secondary"
              />
            )}
          </Box>
        </Box>
      </div>
    </SlideAnimation>
  );
});
