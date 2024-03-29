import { Done, HighlightOff } from "@mui/icons-material";
import { Avatar, Box, Chip, Divider, Paper, Typography } from "@mui/material";
import { ApologyModel } from "../../api/models/attendance";
import { DateOnlyFormatter } from "../../helpers/formatters";
import GrowAnimation from "../shared/animate-content/GrowAnimation";

interface Props {
  data: ApologyModel;
}

export default function ApologyCard({ data }: Props) {
  const status = !data.isRejected;
  const color = status ? "success" : "error";

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

          <Chip
            size="small"
            color={color}
            avatar={
              <Avatar>
                {status ? (
                  <Done color={color} />
                ) : (
                  <HighlightOff color={color} />
                )}
              </Avatar>
            }
            label={status ? "Approved" : "Declined"}
          />
        </Box>

        <Divider
          sx={{
            py: 1,
          }}
        />

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
        <Divider
          sx={{
            py: 1,
          }}
        />

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

        {data.isRejected && (
          <>
            <Divider
              sx={{
                py: 1,
              }}
            />

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
                Feedback
              </Typography>
              <Typography className="fw-light">
                {data.rejectionReason}
              </Typography>
            </Box>
          </>
        )}
      </Paper>
    </GrowAnimation>
  );
}
