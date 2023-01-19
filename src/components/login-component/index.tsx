import { Paper, Button } from "@mui/material";
import "./LoginComponent.css";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import MyFormikController from "../shared/inputs/MyFormikController";
import { OrganizationTitle } from "../shared/organization-title/OrganizationTitle";

export default function LoginComponent() {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="login-component-container">
      <OrganizationTitle />
      <Paper elevation={2} className="login-component-card">
        <h1>Login to your account</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => console.log(values)}
        >
          {({ isSubmitting }) => (
            <Form>
              <MyFormikController
                control="input"
                type="email"
                label="Email"
                name="email"
              />
              <br />
              <MyFormikController
                control="input-password"
                name="password"
                label="Password"
              />

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
      </Paper>
    </div>
  );
}
