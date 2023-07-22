import { Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import CustomAccordion from "../../shared/custom-accordion";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import WelcomeEmailSender from "./WelcomeEmailSender";
import ContentTitle from "../../shared/content-title";
import BirthdayEmailSender from "./BirthdayEmailSender";

export default observer(function EmailerAdmin() {
  const [numOfCelebs, setNumOfCelebs] = useState(0);

  const { authenticationStore, commonStore } = useStore();

  useEffect(() => {
    (async () => {
      try {
        commonStore.setLoading(true);

        await authenticationStore.getNumOfUnwelcomedUser();

        const celebrantsCount =
          await authenticationStore.getNumberOfCelebrants();
        setNumOfCelebs(celebrantsCount);
      } catch (error) {
        throw error;
      } finally {
        commonStore.setLoading(false);
      }
    })();
  });
  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <ContentTitle title="Automated Notifications" />
      <CustomAccordion
        isExpanded={true}
        title="Welcome Email"
        content={
          <WelcomeEmailSender count={authenticationStore.numOfNewUsers} />
        }
      />

      <Divider
        sx={{
          my: 2,
        }}
      />
      <CustomAccordion
        isExpanded={true}
        title="Birthday Emails"
        content={<BirthdayEmailSender count={numOfCelebs} />}
      />
    </Box>
  );
});
