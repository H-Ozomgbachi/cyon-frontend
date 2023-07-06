import { Box, Button, Divider, Fab, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import {
  CalendarMonth,
  Create,
  Description,
  Download,
} from "@mui/icons-material";
import ContentTitle from "../../shared/content-title";
import { useEffect } from "react";
import MySkeleton from "../../shared/loading-spinner/MySkeleton";
import { DateOnlyFormatter } from "../../../helpers/formatters";
import { downloadMinute } from "../../meeting/MeetingDetail";
import CreateMinute from "./CreateMinute";
import DeleteMinute from "./DeleteMinute";

export default observer(function MinuteAdmin() {
  const { meetingStore, commonStore } = useStore();

  useEffect(() => {
    if (meetingStore.minutes.length === 0) {
      meetingStore.getMinutes();
    }
  }, [meetingStore]);

  return (
    <Box>
      <ContentTitle title="Minutes of Meeting" />

      {meetingStore.loadingMinutes ? (
        <MySkeleton count={3} />
      ) : (
        meetingStore.minutes.map((el) => (
          <div key={el.id}>
            <Paper className="paper-bg">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {" "}
                  <CalendarMonth fontSize="small" /> Date
                </Typography>

                <Typography>{DateOnlyFormatter(el.dateOfMeeting)}</Typography>
              </Box>
              <Divider
                sx={{
                  my: 1,
                }}
              />{" "}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {" "}
                  <Description fontSize="small" /> File
                </Typography>

                <Button
                  type="button"
                  variant="contained"
                  className="uni-green_btn"
                  startIcon={<Download />}
                  onClick={() => downloadMinute(el.content)}
                >
                  Download
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  <Button
                    color="error"
                    startIcon={<Description fontSize="small" />}
                    onClick={() =>
                      commonStore.setModalContent(
                        <DeleteMinute data={el} />,
                        `Delete minute for ${DateOnlyFormatter(
                          el.dateOfMeeting
                        )}`
                      )
                    }
                  >
                    Delete
                  </Button>
                </Typography>
              </Box>
            </Paper>
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
            commonStore.setModalContent(<CreateMinute />, "New Minute", true)
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
