import { Route, Routes } from "react-router-dom";
import MyModal from "./components/shared/modal/MyModal";
import { observer } from "mobx-react-lite";
import Account from "./pages/account";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import MyAlert from "./components/shared/alert";
import LoadingSpinner from "./components/shared/loading-spinner";
import { useStore } from "./api/main/appStore";
import { useEffect } from "react";
import { customHistory } from ".";
import { isMobile } from "react-device-detect";

export default observer(function App() {
  const { commonStore, authenticationStore } = useStore();

  useEffect(() => {
    commonStore.handleCloseOrUnloadWindow();
  }, [commonStore]);

  useEffect(() => {
    if (commonStore.token && !authenticationStore.currentUser) {
      (async () => {
        await authenticationStore.getMyAccount();
      })();
    } else {
      customHistory.push("/account/login");
    }
  }, [commonStore.token, authenticationStore]);

  return !isMobile ? (
    <>
      <MyModal />
      <MyAlert />
      <LoadingSpinner />

      <Routes>
        <Route index element={<Home />} />

        <Route path="account">
          <Route index element={<Account />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="dashboard">
          <Route index element={<Dashboard />} />
          <Route path="announcements" element={<></>} />
        </Route>
      </Routes>
    </>
  ) : (
    <h2 className="p-3 mt-1">
      This Site is Currently Supported for Mobile Devices Only
    </h2>
  );
});
