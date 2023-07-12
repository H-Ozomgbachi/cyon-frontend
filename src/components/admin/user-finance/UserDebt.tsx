import { DoubleArrow } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import * as Yup from "yup";
import { useState } from "react";
import { UserFinanceModel } from "../../../api/models/finance";
import DebtClearanceCard from "./DebtClearanceCard";
import ContentTitle from "../../shared/content-title";
import NoResult from "../../shared/no-result";

export default observer(function UserDebt() {
  const [debts, setDebts] = useState<UserFinanceModel[]>([]);
  const [isDebtSearched, setIsDebtSearched] = useState(false);
  const [currentDebtorName, setCurrentDebtorName] = useState("");
  const { financeStore, authenticationStore } = useStore();

  const getFirstNameFromList = (userId: string) => {
    const selectedUser = authenticationStore.allUsers.find(
      (el) => el.id === userId
    );

    return `${selectedUser?.firstName ?? ""}`;
  };

  const initialValues = {
    userId: "",
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required("Member's name required"),
  });

  const handleSubmit = async (userId: string) => {
    const result = await financeStore.getUserDebts(userId);
    setIsDebtSearched(true);
    setCurrentDebtorName(getFirstNameFromList(userId));
    setDebts(result);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => handleSubmit(values.userId)}
      >
        {() => (
          <Form>
            <MyFormikController
              control="select"
              label="Member's Name"
              name="userId"
              options={authenticationStore.usersOption}
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
              Get Debts
            </Button>
          </Form>
        )}
      </Formik>

      {isDebtSearched ? (
        <Box
          sx={{
            mt: 3,
          }}
        >
          <ContentTitle title={`${currentDebtorName}'s Debt Record`} />
          {debts.length !== 0 ? (
            debts.map((el) => <DebtClearanceCard data={el} key={el.id} />)
          ) : (
            <NoResult title="No Unpaid Debt!" />
          )}
        </Box>
      ) : null}
    </div>
  );
});
