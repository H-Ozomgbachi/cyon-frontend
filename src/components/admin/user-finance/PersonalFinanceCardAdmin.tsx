import { Avatar, Box, Chip, Paper, Typography } from "@mui/material";
import { UserFinanceModel } from "../../../api/models/finance";
import { DateOnlyFormatter, NairaFormatter } from "../../../helpers/formatters";
import { Done, HighlightOff } from "@mui/icons-material";
import { useStore } from "../../../api/main/appStore";
import ModalDecisionContent from "../../shared/modal/ModalDecisionContent";

type Props = {
  data: UserFinanceModel;
};

export default function PersonalFinanceCardAdmin({ data }: Props) {
  const color = data.financeType === "Pay" ? "success" : "error";
  const { commonStore, financeStore } = useStore();

  return (
    <div
      onClick={() =>
        commonStore.setModalContent(
          <ModalDecisionContent
            actionName="delete a finance record"
            actionCallback={() => financeStore.deleteUserFinance(data.id)}
          />,
          ""
        )
      }
    >
      <Paper className="personal-finance_box">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{data.description}</Typography>
          <Chip
            size="small"
            color={color}
            avatar={
              <Avatar>
                {data.financeType === "Pay" ? (
                  <Done color={color} />
                ) : (
                  <HighlightOff color={color} />
                )}
              </Avatar>
            }
            label={data.financeType === "Pay" ? "Payment" : "Debt"}
          />
        </Box>
        <Typography
          sx={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#777",
          }}
        >
          {" "}
          {NairaFormatter(data.amount)}{" "}
        </Typography>
        <Typography
          sx={{
            textAlign: "end",
            fontSize: "0.7rem",
          }}
        >
          {DateOnlyFormatter(data.dateCollected)}
        </Typography>
      </Paper>
    </div>
  );
}
