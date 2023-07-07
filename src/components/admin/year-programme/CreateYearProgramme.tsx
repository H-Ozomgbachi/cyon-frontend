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
import dayjs from "dayjs";
import { TODAY } from "../../shared/inputs/CustomDatePicker";
import { scopeList } from "../../../data/selectOptions";

export default observer(function CreateYearProgramme() {
  const { yearProgrammeStore } = useStore();
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
    startDate: dayjs(TODAY),
    endDate: dayjs(TODAY),
    scope: "",
    year: "",
    image: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    scope: Yup.string().required("Scope is required"),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const formData = new FormData();

          formData.append("title", values.title);
          formData.append("startDate", values.startDate.toISOString());
          formData.append("endDate", values.endDate.toISOString());
          formData.append("scope", values.scope);
          formData.append("year", values.year);
          formData.append("image", file, fileName);

          yearProgrammeStore.addYearProgramme(formData);
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
              label="Start Date"
              name="startDate"
            />
            <MyFormikController
              control="date-picker"
              label="End Date"
              name="endDate"
            />
            <MyFormikController
              control="select"
              label="Scope"
              name="scope"
              options={scopeList}
            />
            <MyFormikController
              control="input"
              label="Year"
              name="year"
              type="number"
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
