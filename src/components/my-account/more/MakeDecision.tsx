import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useStore } from "../../../api/main/appStore";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { DecisionModel } from "../../../api/models/decision";
import { LinedTitle } from "../../meeting/MeetingDetail";

interface Props {
  data: DecisionModel[];
}

export default observer(function MakeDecision({ data }: Props) {
  const { decisionStore } = useStore();

  useEffect(() => {
    (async () => {
      await decisionStore.getDecisions();
    })();
  }, [decisionStore]);

  const openDecisions = data
    .filter((x) => x.isClosed === false)
    .map((el) => {
      const initialValues = {
        response: "",
        decisionId: el.id,
      };

      const validationSchema = Yup.object({
        response: Yup.string().required("Response is required"),
      });

      return (
        <Paper
          elevation={0}
          key={el.id}
          sx={{
            mb: 2,
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) =>
              decisionStore.addDecisionResponse(values)
            }
          >
            {({ isSubmitting }) => (
              <Form>
                <Typography>{el.question}</Typography>

                <MyFormikController
                  control="select"
                  label="Choose an option"
                  name="response"
                  options={decisionStore.getResponseOptions(
                    el.options.split(",")
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="mt-3 uni-green_btn"
                >
                  {isSubmitting ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Decide"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      );
    });

  const closedDecisions = data
    .filter((x) => x.isClosed === true)
    .map((el) => (
      <Paper
        elevation={1}
        key={el.id}
        sx={{
          mb: 2,
          p: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          {el.question}
        </Typography>

        <Typography>Popular Decision</Typography>
        <strong>{el.result}</strong>
      </Paper>
    ));

  return (
    <>
      {openDecisions}

      <Divider
        sx={{
          my: 4,
        }}
      />

      {closedDecisions.length ? LinedTitle("Concluded") : null}
      {closedDecisions}
    </>
  );
});
