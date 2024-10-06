import { FC } from "react";
import { useController, UseControllerProps } from "react-hook-form";

//components
import { CheckBox, CheckBoxProps } from "./CheckBox";

export type CheckBoxFormProps = Omit<CheckBoxProps, "ref"> &
  UseControllerProps & {
    disableError?: boolean;
    hideErrorMessage?: boolean;
  };

export const CheckBoxForm: FC<CheckBoxFormProps> = ({
  name,
  rules,
  onBlur,
  control,
  onChange,
  defaultValue,
  shouldUnregister,
  hideErrorMessage = false,
  ...reset
}) => {
  const { field, fieldState } = useController({
    name,
    rules,
    control,
    defaultValue,
    shouldUnregister,
  });

  const _onChange: CheckBoxProps["onChange"] = (...e) => {
    field.onChange(...e);
    onChange?.(...e);
  };

  const _onBlur: CheckBoxProps["onBlur"] = (...e) => {
    field.onBlur();
    onBlur?.(...e);
  };

  return (
    <CheckBox
      {...reset}
      ref={field.ref}
      name={field.name}
      checked={field.value}
      onChange={_onChange}
      onBlur={_onBlur}
      error={!!fieldState.error?.message}
      helperText={!hideErrorMessage && fieldState.error?.message}
    />
  );
};
