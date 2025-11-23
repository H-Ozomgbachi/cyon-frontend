import { Route, Routes, useLocation } from "react-router-dom";
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
import Admin from "./pages/admin";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import SetupAdmin from "./pages/admin/SetupAdmin";
import AccountManagementAdmin from "./pages/admin/AccountManagementAdmin";
import NotificationAdmin from "./pages/admin/NotificationAdmin";
import ConfirmEmail from "./pages/auth/ConfirmEmail";

export default observer(function App() {
  const { commonStore, authenticationStore } = useStore();
  const location = useLocation();

  useEffect(() => {
    commonStore.handleCloseOrUnloadWindow();
  }, [commonStore]);

  useEffect(() => {
    if (
      !location.pathname.includes("reset-password") &&
      location.pathname !== "/" && // Don't fetch user data on landing page
      commonStore.token &&
      !authenticationStore.currentUser
    ) {
      authenticationStore.getMyAccount();
    }
  }, [authenticationStore, commonStore, commonStore.token, location.pathname]);

  return (
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
            <Route path="confirm-email" element={<ConfirmEmail />} />
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
            <Route path="notifications" element={<NotificationAdmin />} />
          </Route>
        </Routes>
      ) : (
        <ResetPassword />
      )}
    </>
  );
});
