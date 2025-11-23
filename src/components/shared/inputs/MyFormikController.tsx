import CustomAutocomplete from "./CustomAutocomplete";
import CustomCheckbox from "./CustomCheckbox";
import CustomDatePicker from "./CustomDatePicker";
import CustomInput, { MyInputProps } from "./CustomInput";
import CustomInputPassword from "./CustomInputPassword";
import CustomInputTextArea from "./CustomInputTextArea";
import CustomSelect from "./CustomSelect";

export default function MyFormikController(props: MyInputProps) {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <CustomInput {...rest} />;
    case "input-password":
      return <CustomInputPassword {...rest} />;
    case "select":
      return <CustomSelect {...rest} />;
    case "autocomplete":
      return <CustomAutocomplete {...rest} />;
    case "checkbox":
      return <CustomCheckbox {...rest} />;
    case "date-picker":
      return <CustomDatePicker {...rest} />;
    case "text-area":
      return <CustomInputTextArea {...rest} />;
    default:
      return null;
  }
}
