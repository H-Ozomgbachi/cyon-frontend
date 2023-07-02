import { Button, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useStore } from "../../../api/main/appStore";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { Send } from "@mui/icons-material";

export default observer(function DeactivateRequest() {
  const { accountManagementStore } = useStore();

  const initialValues = {
    reason: "",
  };

  const validationSchema = Yup.object({
    reason: Yup.string().required("Reason for deactivation is required"),
  });

  return (
    <Paper elevation={0}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          accountManagementStore.requestToDeactivateAccount({
            reason: values.reason,
          })
        }
      >
        {() => (
          <Form>
            <MyFormikController
              type="text"
              control="text-area"
              name="reason"
              label="State your reason"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-3 uni-green_btn"
              startIcon={<Send />}
            >
              send
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
});
