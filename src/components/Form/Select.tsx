import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import {
  Controller,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

type SelectControllerProps = {
  name: UseControllerProps["name"];
  rules?: UseControllerProps["rules"];
  defaultValue?: UseControllerProps["defaultValue"];

  options: {
    id: string;
    label: string;
  }[];
  helperText?: string;
} & SelectProps;

const SelectFormController = ({
  name,
  rules,
  defaultValue = "",
  options,
  helperText = " ",
  ...rest
}: SelectControllerProps) => {
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
        <FormControl fullWidth error={!!error}>
          <InputLabel>{rest.label}</InputLabel>

          <Select
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
          >
            {options.map(({ id, label }) => (
              <MenuItem value={id} key={id}>
                {label}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText>{error?.message ?? helperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default SelectFormController;
