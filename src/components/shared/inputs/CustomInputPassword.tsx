import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useField } from "formik";
import { useState } from "react";
import { MyInputProps } from "./CustomInput";

export default function CustomInputPassword(props: MyInputProps) {
  const { name, label, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(props);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth className="mb-1">
      <TextField
        id={name}
        type={showPassword ? "text" : "password"}
        label={label}
        autoComplete="off"
        {...rest}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
