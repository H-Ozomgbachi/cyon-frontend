import { Button, Paper } from "@mui/material";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { TODAY } from "../shared/inputs/CustomDatePicker";
import * as Yup from "yup";
import MyFormikController from "../shared/inputs/MyFormikController";
import { attendanceTypeList } from "../../data/selectOptions";

export default function AddApology() {
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
        onSubmit={(values, { resetForm }) => console.log(values)}
      >
        {({ values }) => (
          <Form>
            <MyFormikController
              control="select"
              label="Activity"
              name="attendanceTypeId"
              options={attendanceTypeList}
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
}
