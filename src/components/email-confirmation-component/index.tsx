import { Paper, Button } from "@mui/material";
import * as Yup from "yup";
import { useEffect } from "react";
import { Formik, Form } from "formik";
import MyFormikController from "../shared/inputs/MyFormikController";
import { OrganizationTitle } from "../shared/organization-title/OrganizationTitle";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import { useLocation } from "react-router-dom";

export default observer(function EmailConfirmationComponent() {
  const { authenticationStore } = useStore();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      authenticationStore.sendConfirmMessage(`${location.state}`);
    }
  }, [location.state, authenticationStore]);

  const initialValues = {
    email: location.state ? `${location.state}` : "",
    passcode: "",
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
        <h1>Email Confirmation</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) =>
            authenticationStore.confirmEmail(values.email, values.passcode)
          }
        >
          {({ isSubmitting }) => (
            <Form>
              <MyFormikController
                control="input"
                type="text"
                label="Enter Passcode"
                name="passcode"
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="mt-3 login-component-btn"
              >
                Confirm
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  );
});
