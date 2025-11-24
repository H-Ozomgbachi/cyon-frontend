import React, { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { UpcomingEventModel } from "../../api/models/upcomingEvent";
import { CompleteDateFormatter } from "../../helpers/formatters";
import { OrganizationColors } from "../../colors";
import MySkeleton from "../shared/loading-spinner/MySkeleton";

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

interface EventCardProps {
  data: UpcomingEventModel;
}

const LandingEventCard = observer(function LandingEventCard({ data }: EventCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="240"
        image={data.imageUrl}
        alt={data.title}
        sx={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{
            fontWeight: 600,
            textTransform: "capitalize",
            color: OrganizationColors.green,
          }}
        >
          {data.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 1,
          }}
        >
          📅 Event Date: {CompleteDateFormatter(data.importantDate)}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#999",
          }}
        >
          Posted: {CompleteDateFormatter(data.dateAdded)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing onClick={handleExpandClick} sx={{ cursor: "pointer" }}>
        <Typography variant="body2" sx={{ ml: 1, color: OrganizationColors.deepYellow, fontWeight: 500 }}>
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
  );
});

export default observer(function UpcomingEventsSection() {
  const { upcomingEventStore } = useStore();

  useEffect(() => {
    if (upcomingEventStore.upcomingEvents.length === 0) {
      upcomingEventStore.getUpcomingEvents();
    }
  }, [upcomingEventStore]);

  // Don't render anything if there are no upcoming events and not loading
  if (!upcomingEventStore.loadingUpcomingEvents && upcomingEventStore.upcomingEvents.length === 0) {
    return null;
  }

  return (
    <Box
      id="upcoming-events"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
            color: OrganizationColors.green,
          }}
        >
          Upcoming Events
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, fontSize: { xs: "1rem", md: "1.25rem" } }}
        >
          Stay informed about our exciting upcoming events and activities.
        </Typography>

        {upcomingEventStore.loadingUpcomingEvents ? (
          <MySkeleton count={3} />
        ) : (
          <Grid container spacing={4}>
            {upcomingEventStore.upcomingEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <LandingEventCard data={event} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
});
