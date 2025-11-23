import { Autocomplete, FormControl, FormHelperText, TextField } from "@mui/material";
import { useField } from "formik";
import { MyInputProps } from "./CustomInput";

export default function CustomAutocomplete(props: MyInputProps) {
  const [field, meta, helpers] = useField(props);
  const { name, label, options = [], disabled } = props;

  const selectedOption = options.find((option) => option.value === field.value) || null;

  return (
    <FormControl fullWidth className="mb-1">
      <Autocomplete
        id={name}
        options={options}
        getOptionLabel={(option) => option.text}
        value={selectedOption}
        disabled={disabled}
        onChange={(_, newValue) => {
          helpers.setValue(newValue ? newValue.value : "");
        }}
        onBlur={() => helpers.setTouched(true)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="standard"
            color="warning"
            error={meta.touched && meta.error ? true : false}
          />
        )}
        isOptionEqualToValue={(option, value) => option.value === value.value}
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
