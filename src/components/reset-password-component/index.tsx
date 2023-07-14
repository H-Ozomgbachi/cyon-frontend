import { Paper, Button } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import MyFormikController from "../shared/inputs/MyFormikController";
import { OrganizationTitle } from "../shared/organization-title/OrganizationTitle";
import { Link, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { ROUTES } from "../../routes";

export default observer(function ResetPasswordComponent() {
  const { authenticationStore } = useStore();

  const location = useLocation();

  const pathName = location.pathname.split("reset-password/");
  const [token, email] = pathName[1].split("userEmail");

  const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
    token: token,
    email: email,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),

    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Must be atleast 8 characters")
      .matches(new RegExp(/^(?=.*[0-9])/), "Must contain a digit"),

    confirmNewPassword: Yup.string()
      .required("You must confirm password")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),

    token: Yup.string().required("Token is required"),
  });

  return (
    <div className="login-component-container">
      <OrganizationTitle />
      <Paper elevation={2} className="login-component-card">
        <h1>Reset password</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) =>
            authenticationStore.resetPassword(values)
          }
        >
          {({ isSubmitting }) => (
            <Form>
              <MyFormikController
                control="input-password"
                name="newPassword"
                label="New Password"
              />
              <br />
              <MyFormikController
                control="input-password"
                name="confirmNewPassword"
                label="Confirm New Password"
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="mt-3 login-component-btn"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <Link className="register-component-link" to={ROUTES.login}>
          Back to Login
        </Link>
      </Paper>
    </div>
  );
});
