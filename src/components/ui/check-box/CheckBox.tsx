import { alpha, Box, ButtonBase, FormHelperText } from "@mui/material";
import { ChangeEvent, ComponentProps, forwardRef, ReactNode } from "react";

//types
import { Override } from "@/models/override";

type ChangeEventInput = ChangeEvent<HTMLInputElement>;
type InputProps = ComponentProps<typeof Box<"input">>;

export type CheckBoxProps = Override<
  InputProps,
  {
    label?: string;
    helperText?: ReactNode;
    fullWidth?: boolean;
    error?: boolean;
    component?: "input";
    onChange?: (event: ChangeEventInput, checked: boolean) => void;
    labelProps?: ComponentProps<typeof Box<"label">>;
    labelTextProps?: ComponentProps<typeof Box<"span">>;
    buttonBaseProps?: ComponentProps<typeof ButtonBase<"span">>;
    containerProps?: ComponentProps<typeof Box>;
  }
>;

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  (
    {
      label,
      error,
      onChange,
      disabled,
      fullWidth,
      helperText,
      component = "input",
      labelProps,
      buttonBaseProps,
      labelTextProps,
      containerProps,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: ChangeEventInput) => {
      const { checked } = e.target;
      onChange?.(e, checked);
    };

    return (
      <Box
        {...containerProps}
        sx={[
          { width: fullWidth ? 1 : 280 },
          ...(Array.isArray(containerProps?.sx)
            ? containerProps.sx
            : [containerProps?.sx]),
        ]}
      >
        <Box
          component="label"
          {...labelProps}
          sx={[
            {
              width: fullWidth ? 1 : 280,
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
            sx={{ marginInlineEnd: 1 }}
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
              type="checkbox"
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
                    border: "1.5px solid",
                    borderColor: error ? "error.main" : "black.900",
                    borderRadius: "5px",
                  },
                  ":after": {
                    content: "''",
                    position: "absolute",
                    zIndex: 50,
                    width: 7,
                    height: 12,
                    top: 2,
                    right: 6,
                    transform: "rotate(45deg)",
                    border: "2px solid",
                    borderInlineEnd: "none",
                    borderBlockStart: "none",
                    borderColor: "transparent",
                  },

                  ":checked": {
                    ":before": {
                      bgcolor: "primary.main",
                      borderColor: "primary.main",
                    },
                    ":after": {
                      borderColor: "common.white",
                    },

                    ":disabled": {
                      ":before": {
                        borderColor: "grey.200",
                        bgcolor: (t) => alpha(t.palette.primary.main, 0.1),
                      },
                      ":after": {
                        borderColor: "grey.200",
                      },
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
            color: error ? "error.main" : disabled ? "grey.100" : "black.700",
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

CheckBox.displayName = "CheckBox";
