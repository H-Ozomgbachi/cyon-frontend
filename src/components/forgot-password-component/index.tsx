import { Paper, Button } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import MyFormikController from "../shared/inputs/MyFormikController";
import { OrganizationTitle } from "../shared/organization-title/OrganizationTitle";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { ROUTES } from "../../routes";

export default observer(function ForgotPasswordComponent() {
  const { authenticationStore } = useStore();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
  });

  return (
    <div className="login-component-container">
      <OrganizationTitle />
      <Paper elevation={2} className="login-component-card">
        <h1>Forgot Password ?</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) =>
            authenticationStore
              .forgotPassword(values)
              .finally(() => resetForm({ values: initialValues }))
          }
        >
          {({ isSubmitting }) => (
            <Form>
              <MyFormikController
                control="input"
                type="email"
                label="Enter your email"
                name="email"
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="mt-3 login-component-btn"
              >
                send reset email
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
