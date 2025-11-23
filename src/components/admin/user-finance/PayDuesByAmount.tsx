import { DoubleArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import * as Yup from "yup";

export default observer(function PayDuesByAmount() {
  const { financeStore, authenticationStore } = useStore();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const initialValues = {
    userId: "",
    description: "Monthly Due",
    duesCostMonthly: 100,
    fromMonth: currentMonth,
    fromYear: currentYear,
    toMonth: currentMonth,
    toYear: currentYear,
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required("Member's name required"),
    description: Yup.string().required("Description required"),
    duesCostMonthly: Yup.number()
      .min(1, "Cost must be greater than 0")
      .required("Cost per month required"),
    fromMonth: Yup.number()
      .min(1, "Invalid month")
      .max(12, "Invalid month")
      .required("From month required"),
    fromYear: Yup.number()
      .min(2000, "Invalid year")
      .required("From year required"),
    toMonth: Yup.number()
      .min(1, "Invalid month")
      .max(12, "Invalid month")
      .required("To month required"),
    toYear: Yup.number()
      .min(2000, "Invalid year")
      .required("To year required"),
  });

  const monthOptions = [
    { text: "January", value: 1 },
    { text: "February", value: 2 },
    { text: "March", value: 3 },
    { text: "April", value: 4 },
    { text: "May", value: 5 },
    { text: "June", value: 6 },
    { text: "July", value: 7 },
    { text: "August", value: 8 },
    { text: "September", value: 9 },
    { text: "October", value: 10 },
    { text: "November", value: 11 },
    { text: "December", value: 12 },
  ];

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          financeStore.payDuesByMonths(values)
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
              control="input"
              label="Description"
              name="description"
              type="text"
            />
            <MyFormikController
              control="input"
              label="Cost per month"
              name="duesCostMonthly"
              type="number"
            />
            <MyFormikController
              control="select"
              label="From Month"
              name="fromMonth"
              options={monthOptions}
            />
            <MyFormikController
              control="input"
              label="From Year"
              name="fromYear"
              type="number"
            />
            <MyFormikController
              control="select"
              label="To Month"
              name="toMonth"
              options={monthOptions}
            />
            <MyFormikController
              control="input"
              label="To Year"
              name="toYear"
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
