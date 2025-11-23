import { Box, Button, Typography } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import dayjs from "dayjs";
import { TODAY } from "../../shared/inputs/CustomDatePicker";
import * as Yup from "yup";
import MyFormikController from "../../shared/inputs/MyFormikController";
import "./Attendance.css";
import { Clear, DoubleArrow } from "@mui/icons-material";
import { useStore } from "../../../api/main/appStore";
import { observer } from "mobx-react-lite";
import { ratingList } from "../../../data/selectOptions";
import { AttendanceDatum } from "../../../api/models/attendance";

export default observer(function TakeAttendance() {
  const { attendanceStore, authenticationStore } = useStore();

  const getUserNameFromList = (userId: string) => {
    const selectedUser = authenticationStore.allUsers.find(
      (el) => el.id === userId
    );

    return `${selectedUser?.firstName ?? ""} ${selectedUser?.lastName ?? ""}`;
  };
  const getUserCodeFromList = (userId: string) => {
    const selectedUser = authenticationStore.allUsers.find(
      (el) => el.id === userId
    );

    return `${selectedUser?.uniqueCode ?? ""}`;
  };

  const initialValues = {
    attendanceTypeId: "",
    date: dayjs(TODAY),
    attendanceData: [] as AttendanceDatum[],
  };

  const validationSchema = Yup.object({
    attendanceTypeId: Yup.string().required("Attendance Type Required"),
    attendanceData: Yup.array().not([], "Attendance data required"),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const isSuccessful = await attendanceStore.takeAttendance({
            ...values,
            date: values.date.toISOString(),
            attendanceData: values.attendanceData.map((el) => {
              return {
                userCode: getUserCodeFromList(el.userCode),
                rating: el.rating,
                name: getUserNameFromList(el.userCode),
              };
            }),
          });

          if (isSuccessful) resetForm({ values: initialValues });
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <MyFormikController
              control="select"
              label="Attendance Type"
              name="attendanceTypeId"
              options={attendanceStore.attendanceTypes}
            />
            <MyFormikController
              control="date-picker"
              label="Date of Activity"
              name="date"
            />

            <Typography
              sx={{
                mt: 2,
              }}
            >
              Attendees
            </Typography>
            <FieldArray
              name="attendanceData"
              render={(arrayHelpers) => (
                <div>
                  {values.attendanceData.map((attendee, index) => (
                    <div key={index} className="attendance-container">
                      <div className="attendance-title">
                        <MyFormikController
                          type="text"
                          control="autocomplete"
                          name={`attendanceData[${index}].userCode`}
                          label="Member's Name"
                          options={authenticationStore.usersOption}
                          required
                        />
                      </div>

                      <div>
                        <MyFormikController
                          type="number"
                          control="select"
                          name={`attendanceData[${index}].rating`}
                          label="Remark"
                          options={ratingList}
                          required
                        />
                      </div>

                      <button
                        type="button"
                        className="attendance-remove-btn"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <Clear className="p-0 m-0" />
                      </button>
                    </div>
                  ))}
                  {values.attendanceData.length < 10 ? (
                    <button
                      className="attendance-add-btn"
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          userCode: "",
                          rating: 0,
                          name: "",
                        })
                      }
                    >
                      + Add
                    </button>
                  ) : null}
                </div>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={values.attendanceData.length <= 0}
              className="mt-3 uni-green_btn"
              startIcon={<DoubleArrow />}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
});
