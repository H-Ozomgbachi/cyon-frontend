import { Box, Button, Divider, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyFormikController from "../shared/inputs/MyFormikController";

export default function Occupation() {
  const initialValues = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    jobTitle: "Software Engineer",
    company: "Stanbic IBTC Bank",
    isStudent: false,
    isUnemployed: false,
    canDo: "",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  };

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required(),
  });

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          my: 2,
        }}
      >
        <Typography>
          You are currently{" "}
          {getEmploymentStatus(
            initialValues.isUnemployed,
            initialValues.isStudent
          )}
        </Typography>
      </Box>
      <Divider />

      <Box
        sx={{
          p: 2,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => console.log(values)}
        >
          {({ values }) => (
            <Form>
              {values.isStudent ||
                (!values.isUnemployed && (
                  <>
                    {" "}
                    <MyFormikController
                      control="input"
                      label={getJobTitleLabel(values.isStudent)}
                      name="jobTitle"
                    />
                    <MyFormikController
                      control="input"
                      name="company"
                      label={getCompanyLabel(values.isStudent)}
                    />
                  </>
                ))}

              {values.isUnemployed && (
                <MyFormikController
                  type="text"
                  control="input"
                  name="canDo"
                  label="Which Job Can You Do ?"
                />
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="mt-3 uni-green_btn"
              >
                save update
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

function getEmploymentStatus(isUnemployed: boolean, isStudent: boolean) {
  if (isUnemployed) return "unemployed";
  else if (isStudent) return "a student";
  else return "employed";
}

function getJobTitleLabel(isStudent: boolean) {
  if (isStudent === true) {
    return "Major";
  } else {
    return "Job Title";
  }
}

function getCompanyLabel(isStudent: boolean) {
  if (isStudent === true) {
    return "Institution";
  } else {
    return "Company";
  }
}
