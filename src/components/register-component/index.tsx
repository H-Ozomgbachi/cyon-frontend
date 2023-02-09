import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { OrganizationTitle } from "../shared/organization-title/OrganizationTitle";
import "./RegisterComponent.css";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import MyFormikController from "../shared/inputs/MyFormikController";
import { departmentList, genderList } from "../../data/selectOptions";
import dayjs from "dayjs";
import { TODAY } from "../shared/inputs/CustomDatePicker";
import { Link } from "react-router-dom";

export default function RegisterComponent() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 3;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    departmentId: "",
    dateOfBirth: dayjs(TODAY),
    gender: "",
    address: "",
    isCommunicant: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    userName: Yup.string().required("Username is required"),
    phoneNumber: Yup.string().required("Phone number is required"),

    departmentId: Yup.string().required("Department is required"),
    dateOfBirth: Yup.date().max(
      new Date(Date.now() - 441504000000),
      "You must be at least 14 years"
    ),
    gender: Yup.string().required("Gender is required"),

    email: Yup.string()
      .email("Must be valid email")
      .required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
    confirmPassword: Yup.string()
      .required("You must confirm password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const steps = [
    {
      description: (
        <>
          <MyFormikController
            control="input"
            type="text"
            label="First name"
            name="firstName"
          />
          <MyFormikController
            control="input"
            type="text"
            label="Last name"
            name="lastName"
          />
          <MyFormikController
            control="input"
            type="text"
            label="User name"
            name="userName"
          />
          <MyFormikController
            control="input"
            type="tel"
            label="Phone Number"
            name="phoneNumber"
          />
        </>
      ),
    },

    {
      description: (
        <>
          <MyFormikController
            control="input"
            type="text"
            label="House Address"
            name="address"
          />
          <MyFormikController
            control="select"
            label="Choose a department"
            name="departmentId"
            options={departmentList}
          />
          <MyFormikController
            control="date-picker"
            name="dateOfBirth"
            label="Date of birth"
          />

          <MyFormikController
            control="select"
            label="Gender"
            name="gender"
            options={genderList}
          />

          <MyFormikController
            control="checkbox"
            label="Are you a communicant ?"
            name="isCommunicant"
          />
        </>
      ),
    },
    {
      description: (
        <>
          <MyFormikController
            control="input"
            type="email"
            label="Email"
            name="email"
          />
          <MyFormikController
            control="input-password"
            label="Password"
            name="password"
          />
          <MyFormikController
            control="input-password"
            label="Confirm Password"
            name="confirmPassword"
          />
        </>
      ),
    },
  ];

  return (
    <div className="register-component-container">
      <OrganizationTitle />
      <Paper elevation={2} className="register-component-card">
        <h1>Open a cyon account</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) =>
            console.log({
              ...values,
              dateOfBirth: values.dateOfBirth.toISOString(),
            })
          }
        >
          {({ isSubmitting }) => (
            <Form>
              {steps[activeStep].description}
              {activeStep === maxSteps - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="mt-3 register-component-btn"
                >
                  Sign Up
                </Button>
              ) : null}
            </Form>
          )}
        </Formik>

        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              color="warning"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              color="warning"
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />

        <Link className="register-component-link" to={"/account/login"}>
          Already have an account ? Sign In
        </Link>
      </Paper>
    </div>
  );
}
