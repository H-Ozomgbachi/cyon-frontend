import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import ContentTitle from "../shared/content-title";
import {
  AutoStories,
  Balance,
  Diversity3,
  PersonOff,
  PsychologyAlt,
  Quiz,
} from "@mui/icons-material";
import { useStore } from "../../api/main/appStore";
import DeactivateRequest from "./more/DeactivateRequest";
import MakeDecision from "./more/MakeDecision";
import ComingSoon from "../shared/coming-soon";

export default observer(function More() {
  const { commonStore, decisionStore } = useStore();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleDeactivateRequest = async () =>
    commonStore.setModalContent(<DeactivateRequest />, "Deactivate Account");

  const handleMakeDecision = async () => {
    const result = await decisionStore.getDecisions();
    commonStore.setModalContent(<MakeDecision data={result} />, "", true);
  };

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <ContentTitle title="More Features" />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={handleMakeDecision}
          >
            <PsychologyAlt
              sx={{
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                color: "rgb(150, 114, 23)",
              }}
            >
              Make Decision
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={handleDeactivateRequest}
          >
            <PersonOff
              sx={{
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                color: "rgb(150, 114, 23)",
              }}
            >
              Deactivate Request
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() =>
              commonStore.setModalContent(
                <ComingSoon information="On this platform, look forward to incredibly fascinating and engaging quiz tournaments. There will be several giveaways!!! The subjects of the quiz might include the Bible, current affairs, catechism, or general knowledge." />,
                ""
              )
            }
          >
            <Quiz
              sx={{
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                color: "rgb(150, 114, 23)",
              }}
            >
              Quiz Competition
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() =>
              commonStore.setModalContent(
                <ComingSoon information="It is our responsibility to assist you in becoming more Catholic! Here you can find fascinating facts about Catholic theology as well as entertaining study resources. When our engineers are finished, Know Your Faith will have the greatest presentation." />,
                ""
              )
            }
          >
            <AutoStories
              sx={{
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                color: "rgb(150, 114, 23)",
              }}
            >
              Know Your Faith Series
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() =>
              commonStore.setModalContent(
                <ComingSoon information="A better system for keeping track of all essential committee reports for future reference is being developed. " />,
                ""
              )
            }
          >
            <Diversity3
              sx={{
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                color: "rgb(150, 114, 23)",
              }}
            >
              Committee Reports
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() =>
              commonStore.setModalContent(
                <ComingSoon information="The greatest approach to be a wonderful member is to be well-versed in the laws that govern this organization. Finding and reading hardcopies might be challenging for Gen Z, so we're bringing it to your phone so you can study it on the go!" />,
                ""
              )
            }
          >
            <Balance
              sx={{
                alignSelf: "center",
              }}
            />
            <Typography
              sx={{
                color: "rgb(150, 114, 23)",
              }}
            >
              {" "}
              Our Constitution
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
});
