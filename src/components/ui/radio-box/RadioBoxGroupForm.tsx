import {
  Control,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

//component
import { RadioBoxGroup, RadioBoxGroupProps } from "./RadioBoxGroup";

export type RadioBoxGroupFormProps<T extends FieldValues> = Omit<
  RadioBoxGroupProps,
  "ref"
> &
  Omit<UseControllerProps, "control"> & {
    control?: Control<T, any>;
    disableError?: boolean;
    hideErrorMessage?: boolean;
  };


export const RadioBoxGroupForm = <T extends FieldValues>({
  name,
  rules,
  control,
  onChange,
  defaultValue,
  shouldUnregister,
  disableError = false,
  hideErrorMessage = false,
  ...reset
}: RadioBoxGroupFormProps<T>) => {
  const { field, fieldState } = useController({
    name,
    rules,
    control: control as Control<FieldValues>,
    defaultValue,
    shouldUnregister,
  });

  const _onChange: RadioBoxGroupProps["onChange"] = (...e) => {
    field.onChange(...e);
    onChange?.(...e);
  };

  return (
    <RadioBoxGroup
      {...reset}
      ref={field.ref}
      name={field.name}
      value={field.value}
      onChange={_onChange}
      error={disableError ? undefined : !!fieldState.error?.message}
      helperText={hideErrorMessage ? undefined : fieldState.error?.message}
    />
  );
};
