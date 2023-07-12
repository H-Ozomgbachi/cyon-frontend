import { Box, Button, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { DebtPaymentDto, UserFinanceModel } from "../../../api/models/finance";
import { DateOnlyFormatter, NairaFormatter } from "../../../helpers/formatters";
import { Form, Formik } from "formik";
import MyFormikController from "../../shared/inputs/MyFormikController";
import * as Yup from "yup";
import { DoubleArrow } from "@mui/icons-material";
import { useState } from "react";
import { useStore } from "../../../api/main/appStore";

interface Props {
  data: UserFinanceModel;
}

export default observer(function DebtClearanceCard({ data }: Props) {
  const [currentAmount, setCurrentAmount] = useState(data.amount);
  const { financeStore } = useStore();

  const initialValues = {
    debtId: data.id,
    amountToClear: 0,
  };

  const validationSchema = Yup.object({
    amountToClear: Yup.number()
      .moreThan(0, "Amount cannot be zero")
      .max(
        currentAmount,
        `Cannot be greater than ${NairaFormatter(currentAmount)}`
      ),
  });

  const handleSubmit = async (values: DebtPaymentDto) => {
    const amountCleared = await financeStore.clearDebt(values);

    setCurrentAmount(data.amount - amountCleared);
  };

  return (
    <Paper className="personal-finance_box">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>{data.description}</Typography>
      </Box>
      <Typography
        sx={{
          fontSize: "1.4rem",
          fontWeight: "bold",
          color: "#777",
        }}
      >
        {" "}
        {NairaFormatter(currentAmount)}{" "}
      </Typography>
      <Typography
        sx={{
          textAlign: "end",
          fontSize: "0.7rem",
        }}
      >
        Since {DateOnlyFormatter(data.dateCollected)}
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => handleSubmit(values)}
      >
        {({ values }) => (
          <Form>
            <MyFormikController
              control="input"
              label="Enter Redemption Amount"
              name="amountToClear"
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
              Pay{" "}
              {values.amountToClear > 0
                ? NairaFormatter(values.amountToClear)
                : ""}
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
});
