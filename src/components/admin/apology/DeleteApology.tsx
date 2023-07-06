import { Button, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ApologyModel } from "../../../api/models/attendance";
import { useStore } from "../../../api/main/appStore";
import MyFormikController from "../../shared/inputs/MyFormikController";

interface Props {
  data: ApologyModel;
}

export default observer(function DeleteApology({ data }: Props) {
  const { attendanceStore } = useStore();

  const initialValues = {
    id: data.id,
    for: data.for,
    attendanceTypeId: data.attendanceTypeId,
    date: data.date,
    reason: data.reason,
    isRejected: true,
    rejectionReason: "",
    isResolved: true,
    userId: data.userId,
    userCode: data.userCode,
    name: data.name,
  };

  const validationSchema = Yup.object({
    rejectionReason: Yup.string().required("Rejection reason required"),
  });

  return (
    <Paper elevation={0}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          attendanceStore.declineApology(values)
        }
      >
        {() => (
          <Form>
            <MyFormikController
              type="text"
              control="text-area"
              name="rejectionReason"
              label="State your reason"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-3 uni-green_btn"
            >
              respond
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
});
