import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ManageAccounts, Notifications, Settings, School, HowToVote } from "@mui/icons-material";
import ContentTitle from "../../shared/content-title";
import { customHistory } from "../../..";
import { ROUTES } from "../../../routes";

export default observer(function MoreAdmin() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.shadows[4],
    },
  }));

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <ContentTitle title="Administrator" />

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => customHistory.push(ROUTES.setupAdmin)}
          >
            <Settings
              sx={{
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                color: "rgb(150, 114, 23)",
              }}
            >
              Setup
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => customHistory.push(ROUTES.accountMgtAdmin)}
          >
            <ManageAccounts
              sx={{
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                color: "rgb(150, 114, 23)",
              }}
            >
              Account Management
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => customHistory.push(ROUTES.notifications)}
          >
            <Notifications
              sx={{
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                color: "rgb(150, 114, 23)",
              }}
            >
              Notifications
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => customHistory.push(ROUTES.educationImpactAdmin)}
          >
            <School
              sx={{
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                color: "rgb(150, 114, 23)",
              }}
            >
              Education Impact
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => customHistory.push(ROUTES.electionsAdmin)}
          >
            <HowToVote
              sx={{
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                color: "rgb(150, 114, 23)",
              }}
            >
              Elections
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
});
