import Typography from "@mui/material/Typography";
import { observer } from "mobx-react-lite";
import { Box, Divider } from "@mui/material";
import SlideAnimation from "../../shared/animate-content/SlideAnimation";
import { useStore } from "../../../api/main/appStore";
import { dateFromNow } from "../../../helpers/formatters";
import CreateOrUpdateDecision from "./CreateOrUpdateDecision";
import { DecisionModel } from "../../../api/models/decision";

interface Props {
  data: DecisionModel;
}

export default observer(function DecisionCardAdmin({ data }: Props) {
  const { commonStore } = useStore();

  const handleClick = () =>
    commonStore.setModalContent(
      <CreateOrUpdateDecision decision={data} />,
      "",
      true
    );

  return (
    <SlideAnimation>
      <div onClick={handleClick}>
        <Box
          sx={{
            mb: 1,
            p: 0.5,
            cursor: "pointer",
          }}
          className="paper-bg"
        >
          <Typography
            sx={{
              fontSize: "1.1rem",
            }}
          >
            {data.question}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.8rem",
              color: "rgba(25, 80, 44, 0.895)",
            }}
          >
            {dateFromNow(data.dateAdded)}
          </Typography>

          {data.isClosed && (
            <>
              <Divider />

              <strong>Result</strong>
              <Typography>{data.result}</Typography>
            </>
          )}
        </Box>
      </div>
    </SlideAnimation>
  );
});
