import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import "./Decision.css";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { useStore } from "../../../api/main/appStore";
import { observer } from "mobx-react-lite";
import { DecisionModel } from "../../../api/models/decision";
import { Clear } from "@mui/icons-material";

interface Props {
  decision: DecisionModel | null;
}

export default observer(function CreateOrUpdateDecision({ decision }: Props) {
  const { decisionStore } = useStore();

  const initialValues = {
    id: decision?.id ?? "",
    question: decision?.question ?? "",
    options: decision?.options.split(",") ?? [],
    isClosed: decision?.isClosed ?? false,
    isActive: decision?.isActive ?? true,
  };

  const validationSchema = Yup.object({
    question: Yup.string().required("Question required"),
    options: Yup.array().required("Options required"),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          decision
            ? decisionStore.updateDecision({
                ...values,
                options: values.options.join(","),
              })
            : decisionStore.addDecision(values)
        }
      >
        {({ values, isSubmitting }) => (
          <Form>
            <MyFormikController
              control="text-area"
              label="Enter Question"
              name="question"
              type="text"
            />

            <Typography
              sx={{
                mt: 2,
              }}
            >
              Options
            </Typography>
            <FieldArray
              name="options"
              render={(arrayHelpers) => (
                <div>
                  {values.options.map((option, index) => (
                    <div key={index} className="decision-container">
                      <div className="decision-title">
                        <MyFormikController
                          type="text"
                          control="input"
                          name={`options[${index}]`}
                          label={`Option ${index + 1}`}
                        />
                      </div>

                      <button
                        type="button"
                        className="decision-remove-btn"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <Clear className="p-0 m-0" />
                      </button>
                    </div>
                  ))}
                  <button
                    className="decision-add-btn"
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                  >
                    + Add
                  </button>
                </div>
              )}
            />

            {decision && (
              <>
                {" "}
                <MyFormikController
                  control="checkbox"
                  name="isClosed"
                  label="Is decision closed ?"
                />
                <MyFormikController
                  control="checkbox"
                  name="isActive"
                  label="Active"
                />
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-3 uni-green_btn"
            >
              {isSubmitting ? (
                <CircularProgress color="inherit" />
              ) : decision ? (
                "Save Changes"
              ) : (
                "Post"
              )}
            </Button>
          </Form>
        )}
      </Formik>

      {decision ? (
        <>
          <br />
          <Button
            color="error"
            variant="contained"
            className="mt-3"
            onClick={() => decisionStore.deleteDecision(decision.id)}
          >
            {decisionStore.isDeletingDecision ? (
              <CircularProgress color="inherit" />
            ) : (
              "delete"
            )}
          </Button>
        </>
      ) : null}
    </Box>
  );
});
