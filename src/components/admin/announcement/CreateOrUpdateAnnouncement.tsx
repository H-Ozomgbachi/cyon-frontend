import { Box, Button, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { useStore } from "../../../api/main/appStore";
import { observer } from "mobx-react-lite";
import { AnnouncementModel } from "../../../api/models/announcement";
import { useState } from "react";
import RichEditor from "../../shared/rich-editor";
import dayjs from "dayjs";
import { TODAY } from "../../shared/inputs/CustomDatePicker";

interface Props {
  announcement: AnnouncementModel | null;
}

export default observer(function CreateOrUpdateAnnouncement({
  announcement,
}: Props) {
  const { announcementStore, notificationsStore } = useStore();
  const [contentValue, setContentValue] = useState(announcement?.content ?? "");

  const initialValues = {
    id: announcement?.id ?? "",
    title: announcement?.title ?? "",
    content: contentValue,
    isActive: announcement?.isActive ?? true,
    importantDate: dayjs(announcement?.importantDate) ?? dayjs(TODAY),
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
                importantDate: values.importantDate.toISOString(),
              })
            : announcementStore.addAnnouncement({
                ...values,
                content: contentValue,
                importantDate: values.importantDate.toISOString(),
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
            <MyFormikController
              control="date-picker"
              label="Important Date"
              name="importantDate"
            />

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Button
                color="primary"
                variant="contained"
                className="mt-3"
                onClick={() =>
                  notificationsStore.sendAnnouncementReminder(announcement.id)
                }
              >
                Send Reminder
              </Button>
            </Box>
            <Box>
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
            </Box>
          </Box>
        </>
      ) : null}
    </Box>
  );
});
