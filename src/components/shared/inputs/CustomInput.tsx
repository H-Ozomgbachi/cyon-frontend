import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useField } from "formik";
import { SelectOptionModel } from "../models/selectOptionModel";

export interface MyInputProps {
  id?: string;
  placeholder?: string;
  name: string;
  type?: string;
  label?: string;
  value?: any;
  min?: number;
  disabled?: boolean;
  checked?: boolean;
  required?: boolean;
  options?: SelectOptionModel[];
  control?: string;
}

export default function CustomInput(props: MyInputProps) {
  const [field, meta] = useField(props);
  const { name, label, ...rest } = props;

  return (
    <FormControl fullWidth className="mb-1">
      <TextField
        id={name}
        label={label}
        {...rest}
        error={meta.touched && meta.error ? true : false}
        color="warning"
        variant="standard"
        {...field}
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
  );
}
