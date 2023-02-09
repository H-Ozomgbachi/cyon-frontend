import { Box } from "@mui/material";
import CustomCarousel from "../shared/carousel";
import ContentTitle from "../shared/content-title";
import AnnouncementCard from "./AnnouncementCard";
import "./Feeds.css";
import YearProgrammeCard from "./YearProgrammeCard";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import MySkeleton from "../shared/loading-spinner/MySkeleton";
import { useEffect } from "react";

export default observer(function Feeds() {
  const { announcementStore, yearProgrammeStore } = useStore();

  useEffect(() => {
    if (
      announcementStore.announcements.length === 0 ||
      yearProgrammeStore.yearProgrammes.length === 0
    ) {
      announcementStore.getAnnouncements();
      yearProgrammeStore.getCurrentYearProgrammes();
    }
  }, [announcementStore, yearProgrammeStore]);

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <ContentTitle title="Programmes" />
      {yearProgrammeStore.loadingYearProgrammes ? (
        <MySkeleton count={1} />
      ) : (
        <CustomCarousel>
          {yearProgrammeStore.yearProgrammes.map((el, i) => (
            <YearProgrammeCard key={i} data={el} />
          ))}
        </CustomCarousel>
      )}

      <ContentTitle title="Announcements" />

      {announcementStore.loadingAnnouncements ? (
        <MySkeleton count={4} />
      ) : (
        announcementStore.announcements.map((el) => (
          <AnnouncementCard key={el.id} data={el} />
        ))
      )}
    </Box>
  );
});
