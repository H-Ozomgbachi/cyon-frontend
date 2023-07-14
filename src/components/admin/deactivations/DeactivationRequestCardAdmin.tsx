import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { AccountDeactivateRequestModel } from "../../../api/models/accountManagement";
import GrowAnimation from "../../shared/animate-content/GrowAnimation";
import ApproveDeactivationRequest from "./ApproveDeactivationRequest";
import DeleteDeactivationRequest from "./DeleteDeactivationRequest";

interface Props {
  data: AccountDeactivateRequestModel;
}

const DeactivationRequestCardAdmin: React.FC<Props> = observer(({ data }) => {
  const { commonStore } = useStore();

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
            {data.userName}
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
            Reason
          </Typography>
          <Typography className="fw-light">
            {data.reasonToDeactivate}
          </Typography>
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
            Phone
          </Typography>
          <Typography className="fw-light">
            <Link
              href={`tel:${data.phone}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {data.phone}
            </Link>
          </Typography>
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
            onClick={() =>
              commonStore.setModalContent(
                <ApproveDeactivationRequest data={data} />,
                ""
              )
            }
          >
            approve
          </Button>
          <Button
            color="inherit"
            onClick={() =>
              commonStore.setModalContent(
                <DeleteDeactivationRequest data={data} />,
                ""
              )
            }
          >
            decline
          </Button>
        </ButtonGroup>
      </Paper>
    </GrowAnimation>
  );
});

export default DeactivationRequestCardAdmin;
