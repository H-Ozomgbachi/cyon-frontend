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
import { Box, Chip } from "@mui/material";
import { EventAvailable, CalendarMonth } from "@mui/icons-material";
import GrowAnimation from "../shared/animate-content/GrowAnimation";
import { observer } from "mobx-react-lite";
import { CompleteDateFormatter } from "../../helpers/formatters";
import { UpcomingEventModel } from "../../api/models/upcomingEvent";
import { OrganizationColors } from "../../colors";

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
  data: UpcomingEventModel;
}

export default observer(function UpcomingEventCard({ data }: Props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Calculate if event is coming soon (within 7 days)
  const eventDate = new Date(data.importantDate);
  const today = new Date();
  const daysUntilEvent = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isComingSoon = daysUntilEvent <= 7 && daysUntilEvent >= 0;

  return (
    <GrowAnimation>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="200"
            image={data.imageUrl}
            alt={data.title}
            sx={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          {isComingSoon && (
            <Chip
              label="Coming Soon!"
              color="error"
              size="small"
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                fontWeight: "bold",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0.7 },
                },
              }}
            />
          )}
        </Box>
        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "capitalize",
              mb: 2,
              color: OrganizationColors.green,
            }}
          >
            {data.title}
          </Typography>

          {/* Event Date - Prominently displayed */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1.5,
              p: 1.5,
              backgroundColor: OrganizationColors.deepYellow,
              borderRadius: 2,
              color: "#fff",
            }}
          >
            <EventAvailable sx={{ fontSize: 28 }} />
            <Box>
              <Typography variant="caption" sx={{ display: "block", opacity: 0.9 }}>
                Event Date
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                {CompleteDateFormatter(data.importantDate)}
              </Typography>
            </Box>
          </Box>

          {/* Posted Date */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CalendarMonth sx={{ fontSize: 18, color: "#999" }} />
            <Typography variant="caption" sx={{ color: "#777" }}>
              Posted: {CompleteDateFormatter(data.dateAdded)}
            </Typography>
          </Box>
        </CardContent>
        <CardActions disableSpacing onClick={handleExpandClick} sx={{ cursor: "pointer", pt: 0 }}>
          <Typography variant="body2" sx={{ ml: 1, color: OrganizationColors.green, fontWeight: 500 }}>
            Read more
          </Typography>
          <ExpandMore
            expand={expanded}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
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
