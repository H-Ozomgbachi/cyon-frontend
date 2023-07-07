import { DoubleArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { TODAY } from "../../shared/inputs/CustomDatePicker";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import * as Yup from "yup";

export default observer(function MarkAbsentees() {
  const { attendanceStore } = useStore();

  const initialValues = {
    dateEventHeld: dayjs(TODAY).add(0, "day"),
    attendanceTypeId: "",
  };

  const validationSchema = Yup.object({
    attendanceTypeId: Yup.string().required("Attendance type required"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          attendanceStore.markAbsentees({
            ...values,
            dateEventHeld: values.dateEventHeld.toISOString(),
          })
        }
      >
        {() => (
          <Form>
            <MyFormikController
              control="date-picker"
              name="dateEventHeld"
              label="Activity Held On"
            />
            <MyFormikController
              control="select"
              label="Attendance Type"
              name="attendanceTypeId"
              options={attendanceStore.attendanceTypes}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
              }}
              className="uni-green_btn"
              startIcon={<DoubleArrow />}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
