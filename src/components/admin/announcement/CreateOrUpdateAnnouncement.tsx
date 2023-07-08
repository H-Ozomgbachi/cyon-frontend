import { Box, Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { useStore } from "../../../api/main/appStore";
import { observer } from "mobx-react-lite";
import { AnnouncementModel } from "../../../api/models/announcement";
import { useState } from "react";
import RichEditor from "../../shared/rich-editor";

interface Props {
  announcement: AnnouncementModel | null;
}

export default observer(function CreateOrUpdateAnnouncement({
  announcement,
}: Props) {
  const { announcementStore } = useStore();
  const [contentValue, setContentValue] = useState(announcement?.content ?? "");

  const initialValues = {
    id: announcement?.id ?? "",
    title: announcement?.title ?? "",
    content: contentValue,
    isActive: announcement?.isActive ?? true,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title required"),
    // content: Yup.string().required("Content required"),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          announcement
            ? announcementStore.updateAnnouncement({
                ...values,
                content: contentValue,
              })
            : announcementStore.addAnnouncement({
                ...values,
                content: contentValue,
              })
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
            {/* <MyFormikController
              control="text-area"
              label="Content"
              name="content"
              type="text"
            /> */}

            <RichEditor
              setValue={setContentValue}
              defaultValue={contentValue}
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
