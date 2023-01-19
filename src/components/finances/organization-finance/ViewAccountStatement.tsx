import { DoubleArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TODAY } from "../../shared/inputs/CustomDatePicker";
import MyFormikController from "../../shared/inputs/MyFormikController";

export default function ViewAccountStatement() {
  const initialValues = {
    startDate: dayjs(TODAY),
    endDate: dayjs(TODAY).add(30, "day"),
  };

  const validationSchema = Yup.object({});

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => console.log(values)}
      >
        {() => (
          <Form>
            <MyFormikController
              control="date-picker"
              name="startDate"
              label="Start Date"
            />
            <MyFormikController
              control="date-picker"
              name="endDate"
              label="End Date"
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
              Generate
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
