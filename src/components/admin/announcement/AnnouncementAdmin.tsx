import { Box, Fab } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { Create } from "@mui/icons-material";
import ContentTitle from "../../shared/content-title";
import { useEffect } from "react";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import AnnouncementCardAdmin from "./AnnouncementCardAdmin";
import CreateOrUpdateAnnouncement from "./CreateOrUpdateAnnouncement";

export default observer(function AnnouncementAdmin() {
  const { announcementStore, commonStore } = useStore();

  useEffect(() => {
    if (announcementStore.announcements.length === 0) {
      announcementStore.getAnnouncements();
    }
  }, [announcementStore]);

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <ContentTitle title="Announcements" />

      {announcementStore.loadingAnnouncements ? (
        <MySkeleton count={3} />
      ) : (
        announcementStore.announcements.map((el, i) => (
          <AnnouncementCardAdmin key={i} data={el} />
        ))
      )}

      <Box
        sx={{
          position: "sticky",
          bottom: "16%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Fab
          size="medium"
          aria-label="add"
          onClick={() =>
            commonStore.setModalContent(
              <CreateOrUpdateAnnouncement announcement={null} />,
              "New Announcement",
              true
            )
          }
        >
          <Create
            sx={{
              color: "rgb(150, 114, 23)",
            }}
          />
        </Fab>
      </Box>
    </Box>
  );
});
