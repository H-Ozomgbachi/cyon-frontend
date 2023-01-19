import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Mic } from "@mui/icons-material";
import GrowAnimation from "../shared/animate-content/GrowAnimation";

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
  title: string;
  image: string;
}

export default function AnnouncementCard({ title, image }: Props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <GrowAnimation>
      <Card sx={{ maxWidth: 345, mb: 1 }}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="poster"
              src="https://res.cloudinary.com/dgmqfvh6c/image/upload/v1673362605/lyc13bevlarntpzn0102.jpg"
            />
          }
          title={
            <div>
              {" "}
              <Mic /> <span className="fw-bold">Henry Ozomgachi</span>{" "}
            </div>
          }
          subheader="September 14, 2016"
        />
        <CardMedia component="img" height="150" image={image} alt="desc" />
        <CardContent>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "capitalize",
            }}
          >
            {title}
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
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </GrowAnimation>
  );
}
