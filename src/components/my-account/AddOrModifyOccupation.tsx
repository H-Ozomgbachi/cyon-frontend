import { OccupationModel } from "../../api/models/occupaton";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import MyFormikController from "../shared/inputs/MyFormikController";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";

interface Props {
  data: OccupationModel | null;
}

export default observer(function AddOrModifyOccupation({ data }: Props) {
  const { occupationStore } = useStore();

  const initialValues = {
    id: data?.id ?? "",
    jobTitle: data?.jobTitle ?? "",
    company: data?.company ?? "",
    isStudent: data?.isStudent ?? false,
    isUnemployed: data?.isUnemployed ?? false,
    canDo: data?.canDo ?? "",
    userId: data?.userId ?? "",
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          my: 2,
        }}
      >
        {data ? (
          <Typography>
            You are currently{" "}
            {getEmploymentStatus(
              initialValues.isUnemployed,
              initialValues.isStudent
            )}
          </Typography>
        ) : (
          <Typography>Fill your occupation form</Typography>
        )}
      </Box>
      <Divider />

      <Box
        sx={{
          p: 2,
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) =>
            data
              ? occupationStore.updateMyOccupation(values)
              : occupationStore.addMyOccupation(values)
          }
        >
          {({ values }) => (
            <Form>
              <MyFormikController
                control="checkbox"
                name="isUnemployed"
                label="Are you unemployed ?"
              />
              {values.isUnemployed && (
                <MyFormikController
                  type="text"
                  control="input"
                  name="canDo"
                  label="Which Job Can You Do ?"
                />
              )}
              <Divider />
              <MyFormikController
                control="checkbox"
                name="isStudent"
                label="Are you a student ?"
              />

              {(values.isStudent || !values.isUnemployed) && (
                <>
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
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="mt-3 uni-green_btn"
              >
                {data ? "save update" : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
});

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
