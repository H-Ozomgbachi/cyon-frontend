import { Route, Routes, Navigate, useLocation } from "react-router-dom";
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
import { isMobile } from "react-device-detect";
import Admin from "./pages/admin";
import { ROUTES } from "./routes";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import SetupAdmin from "./pages/admin/SetupAdmin";
import AccountManagementAdmin from "./pages/admin/AccountManagementAdmin";

export default observer(function App() {
  const { commonStore, authenticationStore } = useStore();
  const location = useLocation();

  useEffect(() => {
    commonStore.handleCloseOrUnloadWindow();
  }, [commonStore]);

  useEffect(() => {
    if (
      commonStore.token &&
      !authenticationStore.currentUser &&
      !location.pathname.includes("reset-password")
    ) {
      (async () => {
        await authenticationStore.getMyAccount();
      })();
    } else if (location.pathname.includes("reset-password")) {
      commonStore.redirectDecision(location.pathname);
    } else {
      <Navigate to={ROUTES.login} replace />;
    }
  }, [commonStore.token, authenticationStore, location.pathname, commonStore]);

  return isMobile ? (
    <>
      <MyModal />
      <MyAlert />
      <LoadingSpinner />

      {!location.pathname.includes("reset-password") ? (
        <Routes>
          <Route index element={<Home />} />

          <Route path="account">
            <Route index element={<Account />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route path="dashboard">
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="admin">
            <Route index element={<Admin />} />
            <Route path="setup" element={<SetupAdmin />} />
            <Route
              path="account-management"
              element={<AccountManagementAdmin />}
            />
          </Route>
        </Routes>
      ) : (
        <ResetPassword />
      )}
    </>
  ) : (
    <h2 className="p-3 mt-1">
      This Site is Currently Supported for Mobile Devices Only
    </h2>
  );
});
