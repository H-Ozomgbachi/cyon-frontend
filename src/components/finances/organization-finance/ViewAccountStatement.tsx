import { DoubleArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { TODAY } from "../../shared/inputs/CustomDatePicker";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import StatementOfAccount from "./StatementOfAccount";

export default observer(function ViewAccountStatement() {
  const { financeStore, commonStore } = useStore();

  const initialValues = {
    startDate: dayjs(TODAY),
    endDate: dayjs(TODAY).add(30, "day"),
  };

  const handleSubmit = async (start: string, end: string) => {
    const response = await financeStore.getOrganizationAccountStatement({
      startDate: start,
      endDate: end,
    });

    return commonStore.setModalContent(
      <StatementOfAccount data={response} />,
      "Statement of Account",
      true
    );
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) =>
          await handleSubmit(
            values.startDate.format("DD/MM/YYYY"),
            values.endDate.format("DD/MM/YYYY")
          )
        }
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
});
