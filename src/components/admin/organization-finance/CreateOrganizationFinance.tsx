import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import * as Yup from "yup";
import { Box, Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import MyFormikController from "../../shared/inputs/MyFormikController";
import dayjs from "dayjs";
import { TODAY } from "../../shared/inputs/CustomDatePicker";
import { orgFinanceTypeList } from "../../../data/selectOptions";

export default observer(function CreateOrganizationFinance() {
  const { financeStore } = useStore();

  const initialValues = {
    financeType: "",
    description: "",
    amount: 0,
    date: dayjs(TODAY),
  };

  const validationSchema = Yup.object({
    financeType: Yup.string().required("Type is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          financeStore.addOrganizationFinance({
            ...values,
            date: values.date.toISOString(),
          })
        }
      >
        {({ values, isSubmitting }) => (
          <Form>
            <MyFormikController
              control="select"
              label="Type"
              name="financeType"
              options={orgFinanceTypeList}
            />
            <MyFormikController
              control="input"
              label="Description"
              name="description"
              type="text"
            />
            <MyFormikController
              control="input"
              label="Amount"
              name="amount"
              type="number"
            />
            <MyFormikController
              control="date-picker"
              label="Date"
              name="date"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-3 uni-green_btn"
            >
              {isSubmitting ? <CircularProgress color="inherit" /> : "Post"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
});
