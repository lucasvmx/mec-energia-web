import { TextField, TextFieldProps } from "@mui/material";
import {
  Controller,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

type TextFieldControllerProps = {
  name: UseControllerProps["name"];
  rules?: UseControllerProps["rules"];
  defaultValue?: UseControllerProps["defaultValue"];
} & TextFieldProps;

const TextFieldFormController = ({
  name,
  rules,
  defaultValue = "",
  helperText = " ",
  ...rest
}: TextFieldControllerProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <TextField
          ref={ref}
          value={value}
          error={Boolean(error)}
          helperText={error?.message ?? helperText}
          fullWidth
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        />
      )}
    />
  );
};

export default TextFieldFormController;
