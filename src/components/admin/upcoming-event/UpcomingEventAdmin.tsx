import { Box, Fab } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { Create } from "@mui/icons-material";
import ContentTitle from "../../shared/content-title";
import { useEffect } from "react";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import UpcomingEventCardAdmin from "./UpcomingEventCardAdmin";
import CreateUpcomingEvent from "./CreateUpcomingEvent";

export default observer(function UpcomingEventAdmin() {
  const { upcomingEventStore, commonStore } = useStore();

  useEffect(() => {
    if (upcomingEventStore.upcomingEvents.length === 0) {
      upcomingEventStore.getUpcomingEvents();
    }
  }, [upcomingEventStore]);

  return (
    <Box>
      <ContentTitle title="Upcoming Events" />

      {upcomingEventStore.loadingUpcomingEvents ? (
        <MySkeleton count={3} />
      ) : (
        upcomingEventStore.upcomingEvents.map((el, i) => (
          <div key={el.id}>
            <UpcomingEventCardAdmin data={el} />
          </div>
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
              <CreateUpcomingEvent />,
              "Create Upcoming Event",
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
