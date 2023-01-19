import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { MyInputProps } from "./CustomInput";

export default function CustomCheckbox(props: MyInputProps) {
  const [field] = useField(props);
  const { name, label, ...rest } = props;
  const formikProps = useFormikContext();

  return (
    <FormControl fullWidth className="mb-1">
      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) =>
              formikProps.setFieldValue(props.name, e.target.checked)
            }
            checked={field.value ?? false}
            {...rest}
          />
        }
        label={props.label}
      />
    </FormControl>
  );
}
