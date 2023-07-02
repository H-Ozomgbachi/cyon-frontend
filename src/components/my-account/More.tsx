import { Box, Grid, Paper, Typography, styled } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ContentTitle from "../shared/content-title";
import { PersonOff, PsychologyAlt } from "@mui/icons-material";
import { useStore } from "../../api/main/appStore";
import DeactivateRequest from "./more/DeactivateRequest";

export default observer(function More() {
  const { commonStore } = useStore();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {}, []);

  const handleDeactivateRequest = () =>
    commonStore.setModalContent(<DeactivateRequest />, "Deactivate Account");

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
