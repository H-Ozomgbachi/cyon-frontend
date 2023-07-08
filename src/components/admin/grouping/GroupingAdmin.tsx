import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "../../../api/main/appStore";
import { Box, Typography } from "@mui/material";
import CustomAccordion from "../../shared/custom-accordion";
import GenerateGroup from "./GenerateGroup";
import { Layers } from "@mui/icons-material";
import GroupResult from "./GroupResult";

export default observer(function GroupingAdmin() {
  const { accountManagementStore } = useStore();
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await accountManagementStore.getNumberOfActiveUsers();

      setActiveUsers(res.numberOfActiveUsers);
    })();
  }, [accountManagementStore]);

  return (
    <Box>
      <Typography
        sx={{
          p: 1,
          fontSize: "0.8rem",
        }}
      >
        There are {activeUsers} active members currently
      </Typography>

      <CustomAccordion
        isExpanded={true}
        title="Generate Groups"
        titleIcon={<Layers />}
        content={<GenerateGroup activeUsers={activeUsers} />}
      />

      <GroupResult />
    </Box>
  );
});
