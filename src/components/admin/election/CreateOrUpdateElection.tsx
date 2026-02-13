import { Box, Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { useStore } from "../../../api/main/appStore";
import { observer } from "mobx-react-lite";
import { Election } from "../../../api/models/election";

interface Props {
  election: Election | null;
}

export default observer(function CreateOrUpdateElection({ election }: Props) {
  const { electionStore } = useStore();

  const initialValues = {
    id: election?.id ?? "",
    title: election?.title ?? "",
    description: election?.description ?? "",
    startAt: election?.startAt ?? "",
    endAt: election?.endAt ?? "",
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
        onSubmit={(values) =>
          election
            ? electionStore.updateElection(election.id, values)
            : electionStore.createElection(values)
        }
      >
        {({ isSubmitting }) => (
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
