import { Override } from "@/models/override";
import { Box, ButtonBase, FormHelperText } from "@mui/material";
import { ChangeEvent, ComponentProps, forwardRef, ReactNode } from "react";

type InputProps = ComponentProps<typeof Box<"input">>;
type ChangeEventInput = ChangeEvent<HTMLInputElement>;

export type RadioBoxProps = Override<
  InputProps,
  {
    label?: string;
    helperText?: ReactNode;
    error?: boolean;
    component?: "input";
    color?: "primary" | "secondary";
    onChange?: (event: ChangeEventInput, value: any) => void;
    labelProps?: ComponentProps<typeof Box<"label">>;
    labelTextProps?: ComponentProps<typeof Box<"span">>;
    buttonBaseProps?: ComponentProps<typeof ButtonBase<"span">>;
    containerProps?: ComponentProps<typeof Box>;
  }
>;

const BorderColorMap = {
  primary: "primary.main",
  secondary: "secondary.main",
};
export const RadioBox = forwardRef<HTMLInputElement, RadioBoxProps>(
  (
    {
      label,
      error,
      disabled,
      onChange,
      helperText,
      component = "input",
      color = "secondary",
      labelProps,
      buttonBaseProps,
      labelTextProps,
      containerProps,
      ...props
    },
    ref
  ) => {
    const borderColor = BorderColorMap[color];

    const handleChange = (e: ChangeEventInput) => {
      const { value } = e.target;
      onChange?.(e, value);
    };

    return (
      <Box {...containerProps}>
        <Box
          component="label"
          {...labelProps}
          sx={[
            {
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            },
            ...(Array.isArray(labelProps?.sx)
              ? labelProps.sx
              : [labelProps?.sx]),
          ]}
        >
          <ButtonBase
            disableRipple
            disabled={disabled}
            TouchRippleProps={{
              center: true,
            }}
            {...buttonBaseProps}
            component="span"
          >
            <Box
              ref={ref}
              disabled={disabled}
              onChange={handleChange}
              {...props}
              component={component}
              type="radio"
              sx={[
                {
                  appearance: "none",
                  MozAppearance: "none",
                  WebkitAppearance: "none",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  ":before": {
                    content: "''",
                    width: 20,
                    height: 20,
                    border: 2,
                    borderColor: error ? "error.main" : "black.900",
                    borderRadius: "50%",
                    cursor: "pointer",
                  },

                  ":checked": {
                    ":before": {
                      border: 6,
                      borderColor,
                    },
                  },
                  ":disabled": {
                    ":before": {
                      borderColor: "grey.200",
                    },
                  },
                },
                ...(Array.isArray(labelProps?.sx)
                  ? labelProps.sx
                  : [labelProps?.sx]),
              ]}
            />
          </ButtonBase>
          <Box
            component="span"
            {...labelTextProps}
            sx={[
              {
                fontSize: 12,
                color: disabled
                  ? "grey.100"
                  : error
                  ? "error.main"
                  : "black.500",
              },
              ...(Array.isArray(labelTextProps?.sx)
                ? labelTextProps.sx
                : [labelTextProps?.sx]),
            ]}
          >
            {label}
          </Box>
        </Box>
        <FormHelperText
          sx={{
            display: "block",
            color: error ? "error.main" : disabled ? "grey.200" : "black.700",
            fontSize: 12,
            marginInlineStart: 1.5,
            mt: 0.5,
          }}
        >
          {helperText}
        </FormHelperText>
      </Box>
    );
  }
);

RadioBox.displayName = "RadioBox";
