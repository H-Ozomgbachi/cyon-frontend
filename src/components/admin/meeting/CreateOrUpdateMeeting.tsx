import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { MeetingModel } from "../../../api/models/meeting";
import { FieldArray, Form, Formik } from "formik";
import dayjs from "dayjs";
import { TODAY } from "../../shared/inputs/CustomDatePicker";
import * as Yup from "yup";
import MyFormikController from "../../shared/inputs/MyFormikController";
import "./Meeting.css";
import { Clear } from "@mui/icons-material";
import { useStore } from "../../../api/main/appStore";
import { observer } from "mobx-react-lite";

interface Props {
  meeting: MeetingModel | null;
}

export default observer(function CreateOrUpdateMeeting({ meeting }: Props) {
  const { meetingStore } = useStore();

  const initialValues = {
    id: meeting?.id ?? "",
    date: dayjs(meeting?.date) ?? dayjs(TODAY),
    proposedDurationInMinutes: meeting?.proposedDurationInMinutes ?? 0,
    additionalInfo: "",
    agenda: meeting?.agenda ?? [],
  };

  const validationSchema = Yup.object({
    proposedDurationInMinutes: Yup.number().required(),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          meeting
            ? meetingStore.updateMeeting({
                ...values,
                date: values.date.toISOString(),
              })
            : meetingStore.addMeeting({
                ...values,
                date: values.date.toISOString(),
              })
        }
      >
        {({ values, isSubmitting }) => (
          <Form>
            <MyFormikController
              control="date-picker"
              label="Date"
              name="date"
            />
            <MyFormikController
              type="number"
              control="input"
              name="proposedDurationInMinutes"
              label="Duration in Minutes"
            />

            <Typography
              sx={{
                mt: 2,
              }}
            >
              Agenda
            </Typography>
            <FieldArray
              name="agenda"
              render={(arrayHelpers) => (
                <div>
                  {values.agenda.map((agendum, index) => (
                    <div key={index} className="agenda-container">
                      <div className="agenda-title">
                        <MyFormikController
                          type="text"
                          control="input"
                          name={`agenda[${index}].title`}
                          label="Title"
                        />
                      </div>

                      <div>
                        <MyFormikController
                          type="text"
                          control="text-area"
                          name={`agenda[${index}].description`}
                          label="Description"
                        />
                      </div>

                      <button
                        type="button"
                        className="agenda-remove-btn"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <Clear className="p-0 m-0" />
                      </button>
                    </div>
                  ))}
                  <button
                    className="agenda-add-btn"
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({ title: "", description: "" })
                    }
                  >
                    + Add
                  </button>
                </div>
              )}
            />

            <MyFormikController
              type="text"
              control="text-area"
              name={`additionalInfo`}
              label="Additional Information"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-3 uni-green_btn"
            >
              {isSubmitting ? (
                <CircularProgress color="inherit" />
              ) : meeting ? (
                "Save Changes"
              ) : (
                "Post"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
});
