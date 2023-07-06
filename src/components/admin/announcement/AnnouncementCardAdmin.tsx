import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { Box, Divider } from "@mui/material";
import { AnnouncementModel } from "../../../api/models/announcement";
import SlideAnimation from "../../shared/animate-content/SlideAnimation";
import { useStore } from "../../../api/main/appStore";
import CreateOrUpdateAnnouncement from "./CreateOrUpdateAnnouncement";
import { dateFromNow } from "../../../helpers/formatters";

interface Props {
  data: AnnouncementModel;
}

export default observer(function AnnouncementCardAdmin({ data }: Props) {
  const { authenticationStore, commonStore } = useStore();

  const read = data.readBy.includes(
    authenticationStore.currentUser?.uniqueCode!
  );

  const handleClick = () =>
    commonStore.setModalContent(
      <CreateOrUpdateAnnouncement announcement={data} />,
      "",
      true
    );

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
              fontSize: "1rem",
            }}
          >
            {data.title}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.7rem",
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
