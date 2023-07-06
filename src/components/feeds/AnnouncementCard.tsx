import Typography from "@mui/material/Typography";
import { AnnouncementModel } from "../../api/models/announcement";
import { observer } from "mobx-react-lite";
import SlideAnimation from "../shared/animate-content/SlideAnimation";
import { Box, Divider } from "@mui/material";
import { useStore } from "../../api/main/appStore";
import AnnouncementDetail from "./AnnouncementDetail";
import { dateFromNow } from "../../helpers/formatters";

interface Props {
  data: AnnouncementModel;
}

export default observer(function AnnouncementCard({ data }: Props) {
  const { authenticationStore, announcementStore, commonStore } = useStore();

  const read = data.readBy.includes(
    authenticationStore.currentUser?.uniqueCode!
  );

  const handleClick = async () => {
    await announcementStore.readAnnouncement(data.id, read);
    commonStore.setModalContent(<AnnouncementDetail data={data} />, "", true);
  };

  return (
    <SlideAnimation>
      <div onClick={handleClick}>
        <Box
          sx={{
            mb: 1,
            p: 0.5,
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              fontWeight: read ? "" : "bold",
              fontSize: "0.9rem",
            }}
          >
            {data.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.6rem",
              color: "rgba(25, 80, 44, 0.895)",
              fontWeight: read ? "" : "bold",
            }}
          >
            {dateFromNow(data.dateAdded)}
          </Typography>

          <Divider
            sx={{
              py: 0.4,
            }}
          />
        </Box>
      </div>
    </SlideAnimation>
  );
});
