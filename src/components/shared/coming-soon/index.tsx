import { Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

interface Props {
  information: string;
}

export default observer(function ComingSoon({ information }: Props) {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
            mb: 2,
            color: "orange",
          }}
        >
          This Feature is Underway!
        </Typography>
        {information}
      </Paper>
    </>
  );
});
