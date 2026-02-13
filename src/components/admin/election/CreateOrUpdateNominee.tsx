import { Box, Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { useStore } from "../../../api/main/appStore";
import { observer } from "mobx-react-lite";
import { Nominee } from "../../../api/models/election";

interface Props {
  electionId: string;
  contestId: string;
  nominee: Nominee | null;
  nextOrder: number;
}

export default observer(function CreateOrUpdateNominee({
  electionId,
  contestId,
  nominee,
  nextOrder,
}: Props) {
  const { electionStore } = useStore();

  const initialValues = {
    id: nominee?.id ?? "",
    fullName: nominee?.fullName ?? "",
    bio: nominee?.bio ?? "",
    photoUrl: nominee?.photoUrl ?? "",
    displayOrder: nominee?.displayOrder ?? nextOrder,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    displayOrder: Yup.number()
      .required("Display order is required")
      .min(0, "Must be 0 or greater"),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) =>
          nominee
            ? electionStore.updateNominee(
                electionId,
                contestId,
                nominee.id,
                values
              )
            : electionStore.addNominee(electionId, contestId, values)
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <MyFormikController
              control="input"
              label="Full Name"
              name="fullName"
              type="text"
            />

            <MyFormikController
              control="text-area"
              label="Bio (optional)"
              name="bio"
              type="text"
            />

            <MyFormikController
              control="input"
              label="Photo URL (optional)"
              name="photoUrl"
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
              ) : nominee ? (
                "Update Nominee"
              ) : (
                "Add Nominee"
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
});
