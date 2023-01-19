import { Box, Button } from "@mui/material";
import CustomCarousel from "../shared/carousel";
import ContentTitle from "../shared/content-title";
import AnnouncementCard from "./AnnouncementCard";
import "./Feeds.css";
import YearProgrammeCard from "./YearProgrammeCard";

const RESULTS = [
  {
    id: "456",
    title: "Beginning of the year prayer chain",
    startDate: "2023-01-12T22:04:53.607Z",
    endDate: "2023-01-15T22:04:53.607Z",
    image:
      "https://img.freepik.com/free-photo/spirituality-religion-hands-folded-prayer-holy-bible-church-concept-faith_1150-12945.jpg",
    scope: "parish",
  },
  {
    id: "123",
    title: "Valentine",
    startDate: "2023-02-14T22:04:53.607Z",
    endDate: "",
    image:
      "https://cdn.pixabay.com/photo/2018/01/05/22/48/couple-3064048__480.jpg",
    scope: "parish",
  },
  {
    id: "5",
    title: "Feed a child",
    startDate: "2023-05-27T22:04:53.607Z",
    endDate: "",
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/21c81788196623.5dceb9c2b0822.jpg",
    scope: "parish",
  },
  {
    id: "6",
    title: "Sports Festival",
    startDate: "2023-06-02T22:04:53.607Z",
    endDate: "",
    image: "https://www.parkview.com/media/Image/Dashboard_952_sports_9_19.jpg",
    scope: "deneary",
  },
  {
    id: "7",
    title: "Youth Week",
    startDate: "2023-06-20T22:04:53.607Z",
    endDate: "2023-06-27T20:04:53.607Z",
    image: "https://youthupglobal.com/wp-content/uploads/2021/07/youth.jpg",
    scope: "parish",
  },
  {
    id: "8",
    title: "end of the year party",
    startDate: "2023-12-08T22:04:53.607Z",
    endDate: "",
    image:
      "https://www.shutterstock.com/image-photo/young-people-dancing-night-club-260nw-351380480.jpg",
    scope: "parish",
  },
];

export default function Feeds() {
  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <ContentTitle title="Programmes" />
      <CustomCarousel>
        {RESULTS.map((el, i) => (
          <YearProgrammeCard key={i} data={el} />
        ))}
      </CustomCarousel>

      <ContentTitle title="Announcements" />

      <AnnouncementCard
        title="Gym activities to hold in the church hall every weekend"
        image="https://www.shutterstock.com/image-photo/within-gym-modern-fitness-equipment-260nw-1471750145.jpg"
      />
      <AnnouncementCard
        title="10 ushers needed for the upcoming cyon wedding on Saturday 24th January"
        image="https://partiesenevents.com/wp-content/uploads/2017/09/best-event-hostesses-wedding-introduction-kwanjula-ushers-in-Kampala-Uganda-Annelah-Ushering-Agency19.jpg"
      />
      <AnnouncementCard
        title="Requiem mass for Pa. Paulinus Nnamdi to hold at Ojo Alaba"
        image="https://comshalom.org/wp-content/uploads/2017/06/12/comshalomadm/missa2.jpg"
      />

      <Button
        sx={{
          mb: 1,
          color: "green",
        }}
      >
        See more...
      </Button>
    </Box>
  );
}
