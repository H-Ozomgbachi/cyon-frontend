import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import GrowAnimation from "../../shared/animate-content/GrowAnimation";
import { DateOnlyFormatter } from "../../../helpers/formatters";
import { ApologyModel } from "../../../api/models/attendance";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import DeclineApology from "./DeclineApology";
import DeleteApology from "./DeleteApology";

interface Props {
  data: ApologyModel;
}

export default observer(function ApologyCardAdmin({ data }: Props) {
  const { attendanceStore, commonStore } = useStore();

  return (
    <GrowAnimation>
      <Paper className="paper-bg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {DateOnlyFormatter(data.date)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              mt: 1,
              fontWeight: "bold",
            }}
          >
            Memeber
          </Typography>
          <Typography className="fw-light">{data.name}</Typography>
        </Box>

        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              mt: 1,
              fontWeight: "bold",
            }}
          >
            For
          </Typography>
          <Typography className="fw-light">{data.for}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              mt: 1,
              fontWeight: "bold",
            }}
          >
            Reason
          </Typography>
          <Typography className="fw-light">{data.reason}</Typography>
        </Box>
        <Divider />

        <ButtonGroup
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
          }}
        >
          <Button
            color="success"
            onClick={() => attendanceStore.approveApology(data)}
          >
            approve
          </Button>
          <Button
            color="inherit"
            onClick={() =>
              commonStore.setModalContent(
                <DeclineApology data={data} />,
                "Decline Apology"
              )
            }
          >
            decline
          </Button>
          <Button
            color="error"
            onClick={() =>
              commonStore.setModalContent(<DeleteApology data={data} />, "")
            }
          >
            delete
          </Button>
        </ButtonGroup>
      </Paper>
    </GrowAnimation>
  );
});
