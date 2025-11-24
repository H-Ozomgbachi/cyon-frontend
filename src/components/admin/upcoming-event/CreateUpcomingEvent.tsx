import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import * as Yup from "yup";
import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { UploadFile } from "@mui/icons-material";
import RichEditor from "../../shared/rich-editor";
import dayjs from "dayjs";
import { TODAY } from "../../shared/inputs/CustomDatePicker";

export default observer(function CreateUpcomingEvent() {
  const { upcomingEventStore } = useStore();
  const [contentValue, setContentValue] = useState("");

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<any>();
  const [url, setUrl] = useState("");

  const handleFileUpload = (file: File | undefined) => {
    if (!file) {
      return;
    }

    setUrl(URL.createObjectURL(file));

    setFile(file);
    setFileName(file.name);
  };

  const initialValues = {
    title: "",
    description: "",
    image: null,
    importantDate: dayjs(TODAY),
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    // description: Yup.string().required("Description is required"),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const formData = new FormData();

          formData.append("title", values.title);
          formData.append("description", contentValue);
          formData.append("image", file, fileName);
          formData.append("importantDate", values.importantDate.toISOString());

          upcomingEventStore.addUpcomingEvent(formData);
        }}
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
              defaultValue={contentValue}
              setValue={setContentValue}
            />

            <Typography
              sx={{
                mt: 1,
              }}
            >
              {url && <CardMedia component="img" image={url} alt="img" />}
            </Typography>
            <label>
              <input
                className="btn d-none"
                type="file"
                onChange={(e) => handleFileUpload(e.target?.files?.[0])}
                required
                accept="image/*"
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
                <UploadFile /> Upload Image
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
