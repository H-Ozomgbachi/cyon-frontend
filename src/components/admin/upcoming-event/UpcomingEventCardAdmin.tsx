import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { UpcomingEventModel } from "../../../api/models/upcomingEvent";
import GrowAnimation from "../../shared/animate-content/GrowAnimation";
import { CompleteDateFormatter } from "../../../helpers/formatters";
import { Button } from "@mui/material";
import DeleteUpcomingEvent from "./DeleteUpcomingEvent";
import { useStore } from "../../../api/main/appStore";
import { Delete } from "@mui/icons-material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface Props {
  data: UpcomingEventModel;
}

export default observer(function UpcomingEventCardAdmin({ data }: Props) {
  const [expanded, setExpanded] = React.useState(false);
  const { commonStore } = useStore();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <GrowAnimation>
      <Card sx={{ mb: 1 }}>
        <CardMedia
          component="img"
          height="auto"
          image={data.imageUrl}
          alt="eventImg"
          sx={{
            objectFit: "cover",
            objectPosition: "top",
          }}
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
              color: "#777",
            }}
          >
            Posted: {CompleteDateFormatter(data.dateAdded)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing onClick={handleExpandClick}>
          <Button
            color="error"
            onClick={() =>
              commonStore.setModalContent(
                <DeleteUpcomingEvent data={data} />,
                `Do you want to delete ${data.title}`
              )
            }
          >
            <Delete color="error" /> remove
          </Button>
          <ExpandMore
            expand={expanded}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {/* <ExpandMoreIcon /> */}
            <Typography paragraph sx={{ ml: 1 }}>
              {expanded ? "See less" : "Read more"}
            </Typography>
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/* <Typography paragraph>{data.description}</Typography> */}

            <div
              className="container"
              dangerouslySetInnerHTML={{
                __html: data.description.replaceAll("<p><br></p>", "<br/>"),
              }}
            />
          </CardContent>
        </Collapse>
      </Card>
    </GrowAnimation>
  );
});
