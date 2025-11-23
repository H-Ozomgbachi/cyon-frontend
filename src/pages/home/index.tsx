import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { useEffect } from "react";
import LandingPage from "../../components/landing/LandingPage";
import { customHistory } from "../..";
import { ROUTES } from "../../routes";

export default observer(function Home() {
  const { commonStore, authenticationStore } = useStore();

  useEffect(() => {
    // If user has a token but no currentUser yet, fetch account data
    if (commonStore.token && !authenticationStore.currentUser) {
      authenticationStore.getMyAccount().then(() => {
        // After successfully fetching user, redirect to dashboard
        if (authenticationStore.currentUser) {
          customHistory.replace(ROUTES.dashboard);
        }
      });
    } 
    // If user is already authenticated, redirect immediately
    else if (authenticationStore.currentUser) {
      customHistory.replace(ROUTES.dashboard);
    }
  }, [commonStore, authenticationStore, commonStore.token]);

  // Show landing page if not authenticated
  if (!authenticationStore.currentUser && !commonStore.token) {
    return <LandingPage />;
  }

  // Show nothing while loading/redirecting
  return null;
});
