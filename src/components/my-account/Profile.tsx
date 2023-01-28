import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyFormikController from "../shared/inputs/MyFormikController";
import { genderList } from "../../data/selectOptions";

export default function Profile() {
  const initialValues = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    firstName: "Henry",
    lastName: "Ozomgbachi",
    userName: "HenryChi",
    phoneNumber: "08144001908",
    gender: "M",
    isCommunicant: true,
    address: "6 OKE Street, Pedro",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
  });

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          my: 2,
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://res.cloudinary.com/dgmqfvh6c/image/upload/v1673362605/lyc13bevlarntpzn0102.jpg"
          sx={{ width: "6rem", height: "6rem" }}
        />
        <Typography>Henry Ozomgbachi</Typography>
      </Box>
      <Divider />

      <Box
        sx={{
          p: 2,
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => console.log(values)}
        >
          {() => (
            <Form>
              <MyFormikController
                control="input"
                label="First Name"
                name="firstName"
              />

              <MyFormikController
                control="input"
                name="lastName"
                label="Last Name"
              />
              <MyFormikController
                control="input"
                name="userName"
                label="Username"
              />
              <MyFormikController
                type="tel"
                control="input"
                name="phoneNumber"
                label="Telephone"
              />
              <MyFormikController
                control="input"
                name="address"
                label="House Address"
              />
              <MyFormikController
                control="select"
                label="Gender"
                name="gender"
                options={genderList}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                className="mt-3 uni-green_btn"
              >
                save update
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
