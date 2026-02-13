import { Box, Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { useStore } from "../../../api/main/appStore";
import { observer } from "mobx-react-lite";
import { Contest } from "../../../api/models/election";

interface Props {
  electionId: string;
  contest: Contest | null;
  nextOrder: number;
  isLiveElection?: boolean;
}

export default observer(function CreateOrUpdateContest({
  electionId,
  contest,
  nextOrder,
  isLiveElection = false,
}: Props) {
  const { electionStore } = useStore();

  const initialValues = {
    id: contest?.id ?? "",
    positionName: contest?.positionName ?? "",
    description: contest?.description ?? "",
    displayOrder: contest?.displayOrder ?? nextOrder,
  };

  const validationSchema = Yup.object({
    positionName: Yup.string().required("Position name is required"),
    displayOrder: Yup.number()
      .required("Display order is required")
      .min(0, "Must be 0 or greater"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    if (contest) {
      await electionStore.updateContest(electionId, contest.id, values);
    } else if (isLiveElection) {
      await electionStore.addContestToLiveElection(electionId, {
        positionName: values.positionName,
        description: values.description,
        displayOrder: values.displayOrder,
      });
    } else {
      await electionStore.addContest(electionId, values);
    }
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <MyFormikController
              control="input"
              label="Position Name"
              name="positionName"
              type="text"
            />

            <MyFormikController
              control="input"
              label="Description (optional)"
              name="description"
              type="text"
            />

            <MyFormikController
              control="input"
              label="Display Order"
              name="displayOrder"
              type="number"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-3 uni-green_btn"
            >
              {isSubmitting ? (
                <CircularProgress color="inherit" size={24} />
              ) : contest ? (
                "Update Contest"
              ) : (
                "Add Contest"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
});
