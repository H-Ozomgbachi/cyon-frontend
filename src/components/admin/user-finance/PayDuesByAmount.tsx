import { DoubleArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import * as Yup from "yup";

export default observer(function PayDuesByAmount() {
  const { financeStore, authenticationStore } = useStore();

  const initialValues = {
    userId: "",
    amountPaid: 0,
    duesCostMonthly: 100,
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required("Member's name required"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          financeStore.payDuesByAmount(values)
        }
      >
        {() => (
          <Form>
            <MyFormikController
              control="select"
              label="Member's Name"
              name="userId"
              options={authenticationStore.usersOption}
            />
            <MyFormikController
              control="input"
              label="Amount Received"
              name="amountPaid"
              type="number"
            />
            <MyFormikController
              control="input"
              label="Cost per month"
              name="duesCostMonthly"
              type="number"
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
