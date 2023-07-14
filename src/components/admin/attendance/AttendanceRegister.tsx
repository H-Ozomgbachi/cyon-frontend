import { observer } from "mobx-react-lite";
import { useStore } from "../../../api/main/appStore";
import {
  AttendanceRecordDto,
  AttendanceRecordModel,
} from "../../../api/models/attendance";
import dayjs from "dayjs";
import { TODAY } from "../../shared/inputs/CustomDatePicker";
import { Form, Formik } from "formik";
import MyFormikController from "../../shared/inputs/MyFormikController";
import { Box, Button, Typography } from "@mui/material";
import { Check, Clear, DoubleArrow } from "@mui/icons-material";
import { useState } from "react";

export default observer(function AttendanceRegister() {
  const { attendanceStore } = useStore();
  const [record, setRecord] = useState<AttendanceRecordModel[]>([]);

  const initialValues = {
    dateOfActivity: dayjs(TODAY),
  };

  const handleSubmit = async (values: AttendanceRecordDto) => {
    const response = await attendanceStore.getAttendanceRecord(values);

    setRecord(response);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) =>
          handleSubmit({
            dateOfActivity: values.dateOfActivity.toISOString(),
          })
        }
      >
        {() => (
          <Form>
            <MyFormikController
              control="date-picker"
              name="dateOfActivity"
              label="Select Date"
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
              View register
            </Button>
          </Form>
        )}
      </Formik>

      <Box
        sx={{
          mt: 2,
        }}
      >
        {record.map((el, i) => (
          <div key={i}>
            <Typography
              fontSize={18}
              sx={{
                fontWeight: "bold",
              }}
            >
              {el.attendanceTypeName}
            </Typography>

            {el.attendances.map((a, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  gap: 1,
                  mb: 1,
                }}
              >
                <strong>{i + 1}.</strong>
                <Typography>{a.name}</Typography>

                {a.isPresent ? (
                  <Check color="success" />
                ) : (
                  <Clear color="error" />
                )}
              </Box>
            ))}
          </div>
        ))}
      </Box>
    </div>
  );
});
