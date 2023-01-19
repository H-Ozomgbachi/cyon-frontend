import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useField } from "formik";
import { MyInputProps } from "./CustomInput";

export default function CustomSelect(props: MyInputProps) {
  const [field, meta] = useField(props);
  const { name, label, ...rest } = props;

  return (
    <FormControl
      variant="standard"
      fullWidth
      color="warning"
      error={meta.touched && meta.error ? true : false}
    >
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        labelId={name}
        id={name}
        label={label}
        {...rest}
        {...field}
        className="mb-1"
      >
        <MenuItem value="">Select an option</MenuItem>
        {props.options?.map((el) => (
          <MenuItem key={el.value} value={el.value}>
            {el.text}
          </MenuItem>
        ))}
      </Select>
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
