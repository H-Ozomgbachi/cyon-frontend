import { Box, Button, Typography } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { Clear, DoubleArrow } from "@mui/icons-material";
import { useStore } from "../../../api/main/appStore";
import { observer } from "mobx-react-lite";
import "./Grouping.css";

interface Props {
  activeUsers: number;
}

export default observer(function GenerateGroup({ activeUsers }: Props) {
  const { accountManagementStore } = useStore();

  const initialValues = {
    numberOfUsersPerGroup: 0,
    groupTitles: [] as string[],
  };

  const validationSchema = Yup.object({
    numberOfUsersPerGroup: Yup.number()
      .moreThan(0, "Number per group required")
      .lessThan(activeUsers + 1, "Must be less or equal to active users"),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) =>
          accountManagementStore.generateRandomUserGroups(values)
        }
      >
        {({ values, isSubmitting }) => (
          <Form>
            <MyFormikController
              control="input"
              label="Members Per Group"
              name="numberOfUsersPerGroup"
              type="number"
            />

            <Typography
              sx={{
                mt: 2,
              }}
            >
              Group Titles
            </Typography>
            <FieldArray
              name="groupTitles"
              render={(arrayHelpers) => (
                <div>
                  {values.groupTitles.map((groupTitle, index) => (
                    <div key={index} className="grouping-container">
                      <div className="grouping-title">
                        <MyFormikController
                          type="text"
                          control="input"
                          name={`groupTitles[${index}]`}
                          label="Enter a title"
                          required
                        />
                      </div>

                      <button
                        type="button"
                        className="grouping-remove-btn"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <Clear className="p-0 m-0" />
                      </button>
                    </div>
                  ))}

                  <button
                    className="grouping-add-btn"
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                  >
                    + Add
                  </button>
                </div>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={values.groupTitles.length <= 0}
              className="mt-3 uni-green_btn"
              startIcon={<DoubleArrow />}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
});
