import { Box, Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { useStore } from "../../../api/main/appStore";
import { observer } from "mobx-react-lite";
import { AnnouncementModel } from "../../../api/models/announcement";

interface Props {
  announcement: AnnouncementModel | null;
}

export default observer(function CreateOrUpdateAnnouncement({
  announcement,
}: Props) {
  const { announcementStore } = useStore();

  const initialValues = {
    id: announcement?.id ?? "",
    title: announcement?.title ?? "",
    content: announcement?.content ?? "",
    isActive: announcement?.isActive ?? true,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title required"),
    content: Yup.string().required("Content required"),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          announcement
            ? announcementStore.updateAnnouncement(values)
            : announcementStore.addAnnouncement(values)
        }
      >
        {({ values, isSubmitting }) => (
          <Form>
            <MyFormikController
              control="input"
              label="Title"
              name="title"
              type="text"
            />
            <MyFormikController
              control="text-area"
              label="Content"
              name="content"
              type="text"
            />

            <MyFormikController
              control="checkbox"
              name="isActive"
              label="Active"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-3 uni-green_btn"
            >
              {isSubmitting ? (
                <CircularProgress color="inherit" />
              ) : announcement ? (
                "Save Changes"
              ) : (
                "Post"
              )}
            </Button>
          </Form>
        )}
      </Formik>

      {announcement ? (
        <>
          <br />
          <Button
            color="error"
            variant="contained"
            className="mt-3"
            onClick={() =>
              announcementStore.deleteAnnouncement(announcement.id)
            }
          >
            {announcementStore.isDeletingAnnouncement ? (
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
