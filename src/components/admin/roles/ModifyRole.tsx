import { FieldArray, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { useStore } from "../../../api/main/appStore";
import * as Yup from "yup";
import { Button, Typography } from "@mui/material";
import { Clear, DoubleArrow } from "@mui/icons-material";
import { rolesList } from "../../../data/selectOptions";
import GrowAnimation from "../../shared/animate-content/GrowAnimation";
import { UserModel } from "../../../api/models/authentication";

interface Props {
  data: UserModel;
  setCurrentlySearchedUser: Function;
}

export default observer(function ModifyRole({
  data,
  setCurrentlySearchedUser,
}: Props) {
  const { authenticationStore } = useStore();

  const initialValues = {
    roles: data.roles,
  };

  const validationSchema = Yup.object({
    roles: Yup.array().of(Yup.string()),
  });

  const handleSubmit = async (roles: string[]) => {
    await authenticationStore.changeRole(data.id, roles);
    setCurrentlySearchedUser(null);
  };

  return (
    <GrowAnimation>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => handleSubmit(values.roles)}
        >
          {({ values }) => (
            <Form>
              <Typography
                sx={{
                  mt: 2,
                }}
              >
                Roles
              </Typography>
              <>
                <FieldArray
                  name="roles"
                  render={(arrayHelpers) => (
                    <div>
                      {values.roles.map((role, index) => (
                        <div key={index} className="agenda-container">
                          <div className="agenda-title">
                            <MyFormikController
                              type="text"
                              control="select"
                              name={`roles[${index}]`}
                              label="Enter Role"
                              options={rolesList}
                            />
                          </div>

                          <button
                            type="button"
                            className="agenda-remove-btn"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <Clear className="p-0 m-0" />
                          </button>
                        </div>
                      ))}
                      <button
                        className="agenda-add-btn"
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        + Add
                      </button>
                    </div>
                  )}
                />
              </>

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
                Modify Role
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </GrowAnimation>
  );
});
