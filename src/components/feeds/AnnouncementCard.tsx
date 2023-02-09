import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GrowAnimation from "../shared/animate-content/GrowAnimation";
import { AnnouncementModel } from "../../api/models/announcement";
import { observer } from "mobx-react-lite";
import { CompleteDateFormatter } from "../../helpers/formatters";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Props {
  data: AnnouncementModel;
}

export default observer(function AnnouncementCard({ data }: Props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <GrowAnimation>
      <Card sx={{ maxWidth: 345, mb: 1 }}>
        <CardMedia
          component="img"
          height="150"
          image={data.photoUrl}
          alt="announcementImg"
        />
        <CardContent>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "capitalize",
            }}
          >
            {data.title}
          </Typography>
          <Typography
            sx={{
              fontStyle: "italic",
              color: "#777",
            }}
          >
            Posted: {CompleteDateFormatter(data.dateAdded)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography paragraph>Details...</Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{data.content}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </GrowAnimation>
  );
});
