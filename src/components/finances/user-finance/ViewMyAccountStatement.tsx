import { DoubleArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { TODAY } from "../../shared/inputs/CustomDatePicker";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import MyStatementOfAccount from "./MyStatementOfAccount";

export default observer(function ViewMyAccountStatement() {
  const { financeStore, commonStore, authenticationStore } = useStore();

  const initialValues = {
    startDate: dayjs(TODAY).add(-4, "month"),
    endDate: dayjs(TODAY),
  };

  const handleSubmit = async (start: string, end: string) => {
    const response = await financeStore.getUserFinanceByRange({
      startDate: start,
      endDate: end,
      userId: authenticationStore.currentUser?.id!,
    });

    return commonStore.setModalContent(
      <MyStatementOfAccount data={response} startDate={start} endDate={end} />,
      "My Statement of Account",
      true
    );
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) =>
          await handleSubmit(
            values.startDate.toISOString(),
            values.endDate.toISOString()
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
              Check
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
