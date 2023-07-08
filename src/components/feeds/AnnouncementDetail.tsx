import { observer } from "mobx-react-lite";
import { Divider, Typography } from "@mui/material";
import { AnnouncementModel } from "../../api/models/announcement";

interface Props {
  data: AnnouncementModel;
}
export default observer(function AnnouncementDetail({ data }: Props) {
  return (
    <div>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        {data.title}
      </Typography>

      <Divider className="my-3" />

      <div
        className="container"
        dangerouslySetInnerHTML={{
          __html: data.content.replaceAll("<p><br></p>", "<br/>"),
        }}
      />
    </div>
  );
});
