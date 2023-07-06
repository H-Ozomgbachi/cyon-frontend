import { Box, Divider } from "@mui/material";
import CustomAccordion from "../../shared/custom-accordion";
import CreateUserFinance from "./CreateUserFinance";
import PayDuesByAmount from "./PayDuesByAmount";

export default function UserFinanceAdmin() {
  return (
    <Box>
      <CustomAccordion
        isExpanded={true}
        title="Record Finance"
        content={<CreateUserFinance />}
      />

      <Divider
        sx={{
          my: 2,
        }}
      />

      <CustomAccordion
        isExpanded={true}
        title="Pay Bulk Dues"
        content={<PayDuesByAmount />}
      />
    </Box>
  );
}
