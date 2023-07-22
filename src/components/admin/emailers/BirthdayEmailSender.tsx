import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { DoubleArrow } from "@mui/icons-material";

interface Props {
  count: number;
}

export default observer(function BirthdayEmailSender({ count }: Props) {
  const { notificationsStore } = useStore();

  const initialValues = {};

  const validationSchema = Yup.object({});

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => notificationsStore.sendBirthdayWishes()}
      >
        {() => (
          <Form>
            <Typography
              sx={{
                mt: 2,
              }}
            >
              Number celebrants today : {count}
            </Typography>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={count === 0}
              className="mt-3 uni-green_btn"
              startIcon={<DoubleArrow />}
            >
              Send birthday wishes
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
});
