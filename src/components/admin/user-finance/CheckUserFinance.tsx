import { DoubleArrow } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import * as Yup from "yup";
import { useState } from "react";
import {
  UserFinanceByRange,
  UserFinanceModel,
} from "../../../api/models/finance";
import ContentTitle from "../../shared/content-title";
import NoResult from "../../shared/no-result";
import dayjs from "dayjs";
import { TODAY } from "../../shared/inputs/CustomDatePicker";
import PersonalFinanceCardAdmin from "./PersonalFinanceCardAdmin";

export default observer(function CheckUserFinance() {
  const [finances, setFinances] = useState<UserFinanceModel[]>([]);
  const [isFinanceSearched, setIsFinanceSearched] = useState(false);
  const [currentMemberName, setCurrentMemberName] = useState("");
  const { financeStore, authenticationStore } = useStore();

  const getFirstNameFromList = (userId: string) => {
    const selectedUser = authenticationStore.allUsers.find(
      (el) => el.id === userId
    );

    return `${selectedUser?.firstName ?? ""}`;
  };

  const initialValues = {
    userId: "",
    startDate: dayjs(TODAY).add(-6, "months"),
    endDate: dayjs(TODAY).add(5, "months"),
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required("Member's name required"),
  });

  const handleSubmit = async (values: UserFinanceByRange) => {
    const result = await financeStore.getUserFinanceByRange(values);
    setIsFinanceSearched(true);
    setCurrentMemberName(getFirstNameFromList(values.userId));
    setFinances(result);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          handleSubmit({
            ...values,
            startDate: values.startDate.toISOString(),
            endDate: values.endDate.toISOString(),
          })
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
              Get Finance Record
            </Button>
          </Form>
        )}
      </Formik>

      {isFinanceSearched ? (
        <Box
          sx={{
            mt: 3,
          }}
        >
          <ContentTitle title={`${currentMemberName}'s Finance Record`} />
          {finances.length !== 0 ? (
            finances.map((el) => (
              <PersonalFinanceCardAdmin data={el} key={el.id} />
            ))
          ) : (
            <NoResult title="No Finance Record!" />
          )}
        </Box>
      ) : null}
    </div>
  );
});
