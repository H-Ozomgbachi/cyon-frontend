import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { useStore } from "../../../api/main/appStore";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { DoubleArrow } from "@mui/icons-material";

interface Props {
  setCurrentlySearchedUser: Function;
}

export default observer(function ChangeRole({
  setCurrentlySearchedUser,
}: Props) {
  const { authenticationStore } = useStore();

  const initialValues = {
    userId: "",
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required("Member's name required"),
  });

  const handleSubmit = async (userId: string) => {
    setCurrentlySearchedUser(null);

    const response = await authenticationStore.getUserById(userId);

    setCurrentlySearchedUser(response);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => handleSubmit(values.userId)}
      >
        {({ values }) => (
          <Form>
            <MyFormikController
              control="autocomplete"
              label="Member's Name"
              name="userId"
              options={authenticationStore.usersOption}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
              }}
              className="uni-green_btn"
              startIcon={<DoubleArrow />}
            >
              proceed
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
