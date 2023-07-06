import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import { TODAY } from "../../shared/inputs/CustomDatePicker";
import * as Yup from "yup";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { useStore } from "../../../api/main/appStore";
import { observer } from "mobx-react-lite";
import { UploadFile } from "@mui/icons-material";
import { useState } from "react";

export default observer(function CreateMinute() {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<any>();

  const { meetingStore } = useStore();

  const handleFileUpload = (file: File | undefined) => {
    if (!file) {
      return;
    }
    setFile(file);
    setFileName(file.name);
  };

  const initialValues = {
    dateOfMeeting: dayjs(TODAY),
    content: null,
  };

  const validationSchema = Yup.object({});

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const formData = new FormData();

          formData.append("dateOfMeeting", values.dateOfMeeting.toISOString());
          formData.append("content", file, fileName);

          meetingStore.addMinute(formData);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <MyFormikController
              control="date-picker"
              label="Date of Meeting"
              name="dateOfMeeting"
            />

            <Typography
              sx={{
                mt: 1,
              }}
            >
              {fileName}
            </Typography>
            <label>
              <input
                className="btn d-none"
                type="file"
                onChange={(e) => handleFileUpload(e.target?.files?.[0])}
                required
              />
              <Typography
                sx={{
                  my: 2,
                  backgroundColor: "rgba(150, 114, 23, 0.7)",
                  p: 1,
                  borderRadius: 1,
                  color: "#fff",
                }}
              >
                {" "}
                <UploadFile /> Upload File
              </Typography>
            </label>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="mt-3 uni-green_btn"
            >
              {isSubmitting ? <CircularProgress color="inherit" /> : "Post"}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
});
