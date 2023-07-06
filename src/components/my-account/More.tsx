import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import ContentTitle from "../shared/content-title";
import { PersonOff, PsychologyAlt } from "@mui/icons-material";
import { useStore } from "../../api/main/appStore";
import DeactivateRequest from "./more/DeactivateRequest";
import MakeDecision from "./more/MakeDecision";

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
      </Grid>
    </Box>
  );
});
