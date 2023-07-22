import { Box, Divider } from "@mui/material";
import CustomAccordion from "../../shared/custom-accordion";
import CreateUserFinance from "./CreateUserFinance";
import PayDuesByAmount from "./PayDuesByAmount";
import UserDebt from "./UserDebt";
import { observer } from "mobx-react-lite";
import CheckUserFinance from "./CheckUserFinance";

export default observer(function UserFinanceAdmin() {
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

      <Divider
        sx={{
          my: 2,
        }}
      />

      <CustomAccordion
        isExpanded={true}
        title="Debt Manager"
        content={<UserDebt />}
      />

      <Divider
        sx={{
          my: 2,
        }}
      />

      <CustomAccordion
        isExpanded={true}
        title="Check Finance Record"
        content={<CheckUserFinance />}
      />
    </Box>
  );
});
