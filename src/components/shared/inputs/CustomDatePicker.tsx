import { FormControl, TextField, FormHelperText } from "@mui/material";
import { MobileDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useField, useFormikContext } from "formik";
import { MyInputProps } from "./CustomInput";

export const TODAY = new Date().toISOString();

export default function CustomDatePicker(props: MyInputProps) {
  const [field, meta] = useField(props);
  const { name, label, ...rest } = props;
  const formikProps = useFormikContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label={label}
        inputFormat="DD/MM/YYYY"
        value={field.value}
        onChange={(e) => formikProps.setFieldValue(props.name, e)}
        renderInput={(params) => (
          <FormControl fullWidth className="mb-1">
            <TextField
              id={name}
              variant="standard"
              color="warning"
              {...params}
              {...rest}
            />

            {meta.touched && meta.error ? (
              <FormHelperText
                sx={{
                  color: "red",
                  p: 0,
                  ml: 0,
                }}
              >
                {meta.error}
              </FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
    </LocalizationProvider>
  );
}
