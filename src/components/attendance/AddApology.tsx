import { Button, Paper } from "@mui/material";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { Form, Formik } from "formik";
import { TODAY } from "../shared/inputs/CustomDatePicker";
import * as Yup from "yup";
import MyFormikController from "../shared/inputs/MyFormikController";
import { useStore } from "../../api/main/appStore";

export default observer(function AddApology() {
  const { attendanceStore } = useStore();

  const initialValues = {
    attendanceTypeId: "",
    absenteeReason: "",
    date: dayjs(TODAY),
  };

  const validationSchema = Yup.object({
    absenteeReason: Yup.string().required("Reason to be absent is required"),
  });

  return (
    <Paper elevation={0}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          attendanceStore.addApology({
            ...values,
            date: values.date.toISOString(),
          })
        }
      >
        {() => (
          <Form>
            <MyFormikController
              control="select"
              label="Activity"
              name="attendanceTypeId"
              options={attendanceStore.attendanceTypes}
            />
            <MyFormikController
              type="text"
              control="text-area"
              name="absenteeReason"
              label="State your reason"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-3 uni-green_btn"
            >
              submit
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
});
