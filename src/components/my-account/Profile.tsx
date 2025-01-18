import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import MyFormikController from "../shared/inputs/MyFormikController";
import { genderList } from "../../data/selectOptions";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import MySkeleton from "../shared/loading-spinner/MySkeleton";
import { Camera } from "@mui/icons-material";

export default observer(function Profile() {
  const { authenticationStore } = useStore();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(
    authenticationStore.currentUser?.photoUrl
  );

  useEffect(() => {
    if (authenticationStore.currentUser) {
      setImageUrl(authenticationStore.currentUser.photoUrl);
    }
  }, [authenticationStore.currentUser]);

  const handleFileUpload = (file: File | undefined) => {
    if (!file) {
      return;
    }
    setImageUrl(URL.createObjectURL(file));
    setFile(file);
  };

  const handleRemove = () => {
    setFile(null);
    setImageUrl(authenticationStore.currentUser?.photoUrl);
  };

  const initialValues = {
    id: authenticationStore.currentUser?.id ?? "",
    firstName: authenticationStore.currentUser?.firstName ?? "",
    lastName: authenticationStore.currentUser?.lastName ?? "",
    userName: authenticationStore.currentUser?.userName ?? "",
    dateOfBirth: authenticationStore.currentUser?.dateOfBirth ?? "",
    phoneNumber: authenticationStore.currentUser?.phoneNumber ?? "",
    gender: authenticationStore.currentUser?.gender ?? "",
    isCommunicant: authenticationStore.currentUser?.isCommunicant ?? false,
    address: authenticationStore.currentUser?.address ?? "",
    userCode: authenticationStore.currentUser?.uniqueCode ?? "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
  });

  if (!authenticationStore.currentUser) {
    return (
      <Box
        sx={{
          p: 2,
        }}
      >
        <MySkeleton count={4} />
      </Box>
    );
  }

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
          src={imageUrl}
          sx={{
            width: "6rem",
            height: "6rem",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        />

        {file ? (
          <Button color="error" onClick={handleRemove}>
            remove
          </Button>
        ) : (
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
                p: 1,
                borderRadius: 1,
                color: "rgba(150, 114, 23, 0.7)",
              }}
            >
              {" "}
              <Camera /> Edit Picture
            </Typography>
          </label>
        )}
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
          onSubmit={(values) =>
            authenticationStore
              .updateMyAccount(values, file)
              .finally(() => setFile(null))
          }
        >
          {({ values }) => (
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
                control="date-picker"
                name="dateOfBirth"
                label="Date of Birth"
              />

              <MyFormikController
                control="input"
                name="userCode"
                label="Member Code"
                disabled
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
              <MyFormikController
                control="checkbox"
                label={
                  values.isCommunicant
                    ? "You are a communicant"
                    : "You're not yet a communicant"
                }
                name="isCommunicant"
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
});
