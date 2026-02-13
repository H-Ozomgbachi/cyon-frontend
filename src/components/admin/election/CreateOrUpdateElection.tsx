import { useEffect } from "react";
import { Box, Button, CircularProgress, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { useStore } from "../../../api/main/appStore";
import { observer } from "mobx-react-lite";
import { Election } from "../../../api/models/election";

interface Props {
  election: Election | null;
}

export default observer(function CreateOrUpdateElection({ election }: Props) {
  const { electionStore, meetingStore } = useStore();

  // Load meetings for the dropdown
  useEffect(() => {
    meetingStore.getMeetings();
  }, [meetingStore]);

  const initialValues = {
    id: election?.id ?? "",
    title: election?.title ?? "",
    description: election?.description ?? "",
    startAt: election?.startAt ?? "",
    endAt: election?.endAt ?? "",
    meetingId: election?.meetingId ?? "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const payload = {
            ...values,
            // Convert empty string to undefined for optional meetingId
            meetingId: values.meetingId || undefined,
          };
          return election
            ? electionStore.updateElection(election.id, payload)
            : electionStore.createElection(payload);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <MyFormikController
              control="input"
              label="Election Title"
              name="title"
              type="text"
            />

            <MyFormikController
              control="text-area"
              label="Description"
              name="description"
              type="text"
            />

            <MyFormikController
              control="input"
              label="Start Date (optional)"
              name="startAt"
              type="datetime-local"
            />

            <MyFormikController
              control="input"
              label="End Date (optional)"
              name="endAt"
              type="datetime-local"
            />

            <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
              <InputLabel id="meeting-select-label">Restrict to Meeting (Optional)</InputLabel>
              <Select
                labelId="meeting-select-label"
                label="Restrict to Meeting (Optional)"
                value={values.meetingId}
                onChange={(e) => setFieldValue("meetingId", e.target.value)}
              >
                <MenuItem value="">
                  <em>No restriction - Anyone can vote</em>
                </MenuItem>
                {meetingStore.meetings.map((meeting) => (
                  <MenuItem key={meeting.id} value={meeting.id}>
                    {new Date(meeting.date).toLocaleDateString()} - {meeting.additionalInfo || "Meeting"}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                If selected, only users who checked in at this meeting can vote
              </FormHelperText>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-3 uni-green_btn"
            >
              {isSubmitting ? (
                <CircularProgress color="inherit" size={24} />
              ) : election ? (
                "Update Election"
              ) : (
                "Create Election"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
});
