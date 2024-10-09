import { Box, FormHelperText, Stack } from "@mui/material";
import { ComponentProps, forwardRef, useState } from "react";

//components & utils
import { RadioBox, RadioBoxProps } from "./RadioBox";

//types
import { Override } from "@/models/override";

export interface RadioBoxGroupOption extends Omit<RadioBoxProps, "id"> {
  id?: string | number;
}

export type RadioBoxGroupProps = Override<
  ComponentProps<typeof Box>,
  {
    options: RadioBoxGroupOption[];
    value?: RadioBoxProps["value"];
    color?: RadioBoxProps["color"];
    defaultValue?: string | number;
    onChange?: (value: any) => void;
    label?: string;
    helperText?: string;
    error?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;

    labelProps?: ComponentProps<typeof Box<"span">>;
    radioListProps?: ComponentProps<typeof Stack>;
  }
>;
export const RadioBoxGroup = forwardRef<HTMLDivElement, RadioBoxGroupProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      label,
      helperText,
      error,
      color,
      disabled,
      labelProps,
      radioListProps,
      ...props
    },
    ref
  ) => {
    // internal state if the component is uncontrolled
    const [selectedValue, setSelectedValue] = useState<RadioBoxProps["value"]>(
      defaultValue ?? ""
    );

    const handleChange = (newValue: RadioBoxProps["value"]) => {
      if (!value) {
        setSelectedValue(newValue); // uncontrolled mode
      }
      if (onChange) {
        onChange(newValue);
      }
    };

    const activeValue = value !== undefined ? value : selectedValue;

    return (
      <Box ref={ref} {...props}>
        <Box
          component="span"
          sx={{
            mb: "8px",
            display: "block",
            marginInlineStart: 0.5,
            fontSize: 12,
            color: disabled ? "grey.100" : "black.500",
          }}
          {...labelProps}
        >
          {label}
        </Box>

        <Stack
          {...radioListProps}
          sx={[
            {
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
            },
            ...(Array.isArray(radioListProps?.sx)
              ? radioListProps.sx
              : [radioListProps?.sx]),
          ]}
        >
          {options.map(({ id, ref, ...option }) => (
            <RadioBox
              key={id}
              ref={ref as any}
              error={error}
              color={color}
              disabled={disabled}
              {...option}
              checked={activeValue === option.value}
              onChange={() => handleChange(option.value)}
            />
          ))}
        </Stack>

        {helperText ? (
          <FormHelperText
            sx={{
              display: "block",
              color: error ? "error.main" : disabled ? "grey.100" : "black.700",
              fontSize: 12,
              marginInlineStart: 1.5,
              mt: 0.5,
            }}
          >
            {helperText}
          </FormHelperText>
        ) : null}
      </Box>
    );
  }
);
