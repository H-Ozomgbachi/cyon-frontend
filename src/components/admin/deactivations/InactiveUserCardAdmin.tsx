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
import GrowAnimation from "../../shared/animate-content/GrowAnimation";
import { UserModel } from "../../../api/models/authentication";
import ApproveReactivation from "./ApproveReactivation";

interface Props {
  data: UserModel;
}

const InactiveUserCardAdmin: React.FC<Props> = observer(({ data }) => {
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
        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              mt: 1,
              fontWeight: "bold",
            }}
          >
            Address
          </Typography>
          <Typography className="fw-light">{data.address}</Typography>
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
              href={`tel:${data.phoneNumber}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {data.phoneNumber}
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
                <ApproveReactivation data={data} />,
                ""
              )
            }
          >
            Activate
          </Button>
        </ButtonGroup>
      </Paper>
    </GrowAnimation>
  );
});

export default InactiveUserCardAdmin;
