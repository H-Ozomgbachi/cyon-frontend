import { Paper } from "@mui/material";
import ContentTitle from "../shared/content-title";
import "./Meeting.css";
import MeetingCard from "./MeetingCard";

const RESULTS = [
  {
    id: "b2b178cc-13e2-40f6-a386-08dae9a1e0ba",
    date: "2022-12-29T13:38:41.533",
    agenda: [
      {
        id: "bbb46cab-4c26-4fe6-d71c-08dae9a1e0cf",
        title: "Valentine Plan",
        description: "string",
      },
      {
        id: "27b3011a-3e1b-4f0f-d71d-08dae9a1e0cf",
        title: "Youth Week Committe Update",
        description: "string",
      },
    ],
    proposedDurationInMinutes: 150,
  },
  {
    id: "b2b178cc-13e2-40f6-a386-08dae9a1e0ba",
    date: "2022-12-29T13:38:41.533",
    agenda: [
      {
        id: "bbb46cab-4c26-4fe6-d71c-08dae9a1e0cf",
        title: "Valentine Plan",
        description: "string",
      },
      {
        id: "27b3011a-3e1b-4f0f-d71d-08dae9a1e0cf",
        title: "Youth Week Committe Update",
        description: "string",
      },
    ],
    proposedDurationInMinutes: 150,
  },
  {
    id: "b2b178cc-13e2-40f6-a386-08dae9a1e0ba",
    date: "2022-11-22T13:38:41.533",
    agenda: [
      {
        id: "4e6ba91f-4f77-45fd-d71b-08dae9a1e0cf",
        title: "Set up committee",
        description: "string",
      },
      {
        id: "bbb46cab-4c26-4fe6-d71c-08dae9a1e0cf",
        title: "Valentine Plan",
        description: "string",
      },
      {
        id: "27b3011a-3e1b-4f0f-d71d-08dae9a1e0cf",
        title: "Youth Week Committe Update",
        description: "string",
      },
    ],
    proposedDurationInMinutes: 140,
  },
  {
    id: "b2b178cc-13e2-40f6-a386-08dae9a1e0ba",
    date: "2022-10-30T13:38:41.533",
    agenda: [
      {
        id: "4e6ba91f-4f77-45fd-d71b-08dae9a1e0cf",
        title: "Set up committee",
        description: "string",
      },
      {
        id: "bbb46cab-4c26-4fe6-d71c-08dae9a1e0cf",
        title: "Valentine Plan",
        description: "string",
      },
      {
        id: "27b3011a-3e1b-4f0f-d71d-08dae9a1e0cf",
        title: "Youth Week Committe Update",
        description: "string",
      },
      {
        id: "27b3011a-3e1b-4f0f-d71d-08dae9a1e0cf",
        title: "Youth Week Committe Update",
        description: "string",
      },
      {
        id: "27b3011a-3e1b-4f0f-d71d-08dae9a1e0cf",
        title: "Youth Week Committe Update",
        description: "string",
      },
    ],
    proposedDurationInMinutes: 155,
  },
];

export default function Meetings() {
  return (
    <Paper
      sx={{
        p: 1,
      }}
      elevation={0}
    >
      <ContentTitle title="General Meetings" />

      {RESULTS.map((el, i) => (
        <MeetingCard key={i} data={el} />
      ))}
    </Paper>
  );
}
