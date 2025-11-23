import { DoubleArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { TODAY } from "../../shared/inputs/CustomDatePicker";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { userFinanceTypeList } from "../../../data/selectOptions";
import * as Yup from "yup";

export default observer(function CreateUserFinance() {
  const { financeStore, authenticationStore } = useStore();

  const initialValues = {
    description: "",
    dateCollected: dayjs(TODAY).add(0, "day"),
    amount: 0,
    userId: "",
    financeType: "",
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required("Member's name required"),
    description: Yup.string().required("Description required"),
    financeType: Yup.string().required("Finance type required"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          financeStore.addUserFinance({
            ...values,
            dateCollected: values.dateCollected.toISOString(),
          })
        }
      >
        {() => (
          <Form>
            <MyFormikController
              control="autocomplete"
              label="Member's Name"
              name="userId"
              options={authenticationStore.usersOption}
            />
            <MyFormikController
              control="select"
              label="Finance Type"
              name="financeType"
              options={userFinanceTypeList}
            />
            <MyFormikController
              control="input"
              label="Amount"
              name="amount"
              type="number"
            />
            <MyFormikController
              control="input"
              label="Description"
              name="description"
              type="text"
            />
            <MyFormikController
              control="date-picker"
              name="dateCollected"
              label="Date"
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
