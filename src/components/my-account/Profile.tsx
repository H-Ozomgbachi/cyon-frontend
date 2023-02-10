import { Avatar, Box, Button, Divider } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyFormikController from "../shared/inputs/MyFormikController";
import { genderList } from "../../data/selectOptions";
import { observer } from "mobx-react-lite";
import { useStore } from "../../api/main/appStore";
import MySkeleton from "../shared/loading-spinner/MySkeleton";

export default observer(function Profile() {
  const { authenticationStore } = useStore();

  const initialValues = {
    id: authenticationStore.currentUser?.id ?? "",
    firstName: authenticationStore.currentUser?.firstName ?? "",
    lastName: authenticationStore.currentUser?.lastName ?? "",
    userName: authenticationStore.currentUser?.userName ?? "",
    phoneNumber: authenticationStore.currentUser?.phoneNumber ?? "",
    gender: authenticationStore.currentUser?.gender ?? "",
    isCommunicant: authenticationStore.currentUser?.isCommunicant ?? false,
    address: authenticationStore.currentUser?.address ?? "",
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
          src={authenticationStore.currentUser?.photoUrl}
          sx={{ width: "6rem", height: "6rem" }}
        />

        <Button
          sx={{
            color: "rgb(150, 114, 23)",
          }}
        >
          Edit Photo
        </Button>
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
          onSubmit={(values) => authenticationStore.updateMyAccount(values)}
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
});
