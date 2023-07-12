import { observer } from "mobx-react-lite";
import ContentTitle from "../../shared/content-title";
import { Box, Divider } from "@mui/material";
import ChangeRole from "./ChangeRole";
import CustomAccordion from "../../shared/custom-accordion";
import ModifyRole from "./ModifyRole";
import { useState } from "react";
import { UserModel } from "../../../api/models/authentication";

export default observer(function RolesAdmin() {
  const [currentlySearchedUser, setCurrentlySearched] =
    useState<UserModel | null>(null);

  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <br />
      <ContentTitle title="Organization Roles Manager" />

      <CustomAccordion
        isExpanded={true}
        title="Select a user"
        content={<ChangeRole setCurrentlySearchedUser={setCurrentlySearched} />}
      />

      {currentlySearchedUser && (
        <>
          <Divider
            sx={{
              my: 2,
            }}
          />
          <CustomAccordion
            isExpanded={true}
            title="User Roles"
            content={
              <ModifyRole
                data={currentlySearchedUser}
                setCurrentlySearchedUser={setCurrentlySearched}
              />
            }
          />
        </>
      )}
    </Box>
  );
});
