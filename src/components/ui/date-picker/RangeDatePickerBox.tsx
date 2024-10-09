import {
  Box,
  Stack,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { ComponentProps, FC, ReactNode, useRef } from "react";

//components
import { CalenderIcon } from "@/assets/icons/CalenderIcon";
import { ChevronLeftIcon } from "@/assets/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/assets/icons/ChevronRightIcon";
import { RootInputBox, RootInputBoxProps } from "@/components/ui/input-box/RootInputBox";

//types
import { Override } from "@/models/override";

import "react-multi-date-picker/styles/colors/green.css"

export type RangeDatePickerBoxProps = Override<
  ComponentProps<typeof DatePicker>,
  {
    format?: string;
    label?: string;
    error?: boolean;
    placeholder?: string;
    fullWidth?: boolean;
    helperText?: ReactNode;
    inputProps?: RootInputBoxProps;
  }
>;

const DATE_REGEX = new RegExp(/\d{4}-\d{1,2}-\d{1,2}/);

const weekDays = [
  ["sat", "ش"],
  ["sun", "ی"],
  ["mon", "د"],
  ["tue", "س"],
  ["wed", "چ"],
  ["thu", "پ"],
  ["fri", "ج"],
];

export const RangeDatePickerBox: FC<RangeDatePickerBoxProps> = ({
  format = "YYYY/MM/DD",
  placeholder = "روز / ماه / سال",
  label,
  fullWidth,
  helperText,
  error,
  inputProps,
  ...props
}) => {
  const firstRef = useRef(null);
  const secondRef = useRef(null);

  return (
    <Box
      sx={{
        width: fullWidth ? 1 : 280,
        ".rmdp-container": {
          width: 1,
        },

        ".rmdp-wrapper": {
          mt: 0.4,
          width: 280,
          borderRadius: "0 0 8px 8px",
          boxShadow: "0 4px 8px 0 #70707029",

          ".rmdp-top-class": {
            justifyContent: "center",
          },
          ".rmdp-week-day": {
            color: "grey.200",
          },
          ".rmdp-header-values": {
            color: "black.700",
          },
          ".rmdp-deactive": {
            color: "grey.200",
          },

          ".rmdp-day": {
            marginBlock: 0.1,
            color: "black.700",
            "&.rmdp-range": {
              boxShadow: "none",
              bgcolor: "primary.400",

              "&.start": {
                position: "relative",
                color: "common.white",
                ":before": {
                  content: "''",
                  position: "absolute",
                  width: 1,
                  height: 1,
                  bgcolor: "primary.main",
                  borderRadius: "50%",
                  left: 0,
                  top: 0,
                },
              },
              "&.end": {
                position: "relative",
                color: "common.white",
                ":before": {
                  content: "''",
                  position: "absolute",
                  width: 1,
                  height: 1,
                  bgcolor: "primary.main",
                  borderRadius: "50%",
                  left: 0,
                  top: 0,
                },
              },
            },
          },
          ".rmdp-range-hover": {
            bgcolor: "primary.400",
            boxShadow: "none",
            color: "text.primary",
          },

          "--rmdp-primary-green": (t) => t.palette.primary.main,
          "--rmdp-secondary-green": "#87ad92",
          "--rmdp-shadow-green": "#87ad92",
          "--rmdp-today-green": (t) => t.palette.primary[300],
          "--rmdp-hover-green": (t) => t.palette.primary[200],
          "--rmdp-deselect-green": "#39795c",
        },
      }}
    >
      <DatePicker
        format={format}
        fixMainPosition
        renderButton={(direction: any, handleClick: any) => {
          return direction === "left" ? (
            <Box sx={{ px: 2 }}>
              <ChevronRightIcon
                style={{ cursor: "pointer" }}
                onClick={handleClick}
              />
            </Box>
          ) : (
            <Box sx={{ px: 2 }}>
              <ChevronLeftIcon
                style={{ cursor: "pointer" }}
                onClick={handleClick}
              />
            </Box>
          );
        }}
        className="green"
        render={(value, openCalendar, handleValueChange) => {
          const splitVal = value?.toString()?.split(" ~ ");
          return (
            <>
              <Box
                component="span"
                sx={{
                  display: "block",
                  marginInlineStart: 0.5,
                  fontSize: 12,
                  color: props.disabled ? "grey.100" : "black.500",
                }}
              >
                {label}
              </Box>
              <Stack direction="row">
                <RootInputBox
                  inputRef={firstRef}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      ".MuiIconButton-root": {
                        path: {
                          fill: (t) => t.palette.grey[200],
                        },
                      },
                      "&.Mui-focused": {
                        borderRadius: "8px 0 0 0",

                        ".MuiIconButton-root": {
                          path: {
                            fill: (t) => t.palette.primary.main,
                          },
                        },
                      },
                    },
                  }}
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: "8px 0 0 8px",
                        height: 48,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disableRipple
                            sx={{
                              marginInlineStart: 0,
                              marginInlineEnd: -1,
                              p: 0,
                            }}
                          >
                            <CalenderIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  autoComplete="off"
                  placeholder={placeholder}
                  value={splitVal?.[0] || ""}
                  disabled={props.disabled}
                  {...inputProps}
                  // these lines should place after spread props
                  label=""
                  helperText=""
                  error={error}
                  onFocus={(e) => {
                    inputProps?.onFocus?.(e);
                    openCalendar();
                  }}
                  onChange={(e) => {
                    if (DATE_REGEX.test(e.target.value)) {
                      inputProps?.onChange?.(e);
                      handleValueChange(e);
                    }
                  }}
                />
                <RootInputBox
                  inputRef={secondRef}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      ".MuiIconButton-root": {
                        path: {
                          fill: (t) => t.palette.grey[200],
                        },
                      },
                      "&.Mui-focused": {
                        borderRadius: "0 8px 0 0",

                        ".MuiIconButton-root": {
                          path: {
                            fill: (t) => t.palette.primary.main,
                          },
                        },
                      },
                    },
                  }}
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: "0 8px 8px 0",
                        height: 48,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disableRipple
                            sx={{
                              marginInlineStart: 0,
                              marginInlineEnd: -1,
                              p: 0,
                            }}
                          >
                            <CalenderIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  autoComplete="off"
                  placeholder={placeholder}
                  value={splitVal?.[1] || ""}
                  disabled={props.disabled}
                  {...inputProps}
                  // these lines should place after spread props
                  label=""
                  helperText=""
                  error={error}
                  onFocus={(e) => {
                    inputProps?.onFocus?.(e);
                    openCalendar();
                  }}
                  onChange={(e) => {
                    if (DATE_REGEX.test(e.target.value)) {
                      inputProps?.onChange?.(e);
                      handleValueChange(e);
                    }
                  }}
                />
              </Stack>
              <FormHelperText
                sx={{
                  display: "block",
                  color: error
                    ? "error.main"
                    : props.disabled
                    ? "grey.100"
                    : "black.700",
                  fontSize: 12,
                  marginInlineStart: 1.5,
                  mt: 0.5,
                }}
              >
                {helperText}
              </FormHelperText>
            </>
          );
        }}
        monthYearSeparator=" "
        showOtherDays
        onOpenPickNewDate={false}
        headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
        weekDays={props?.weekDays || weekDays}
        locale={props?.locale || persian_fa}
        calendar={props?.calendar || persian}
        arrow={false}
        range
        rangeHover
        {...props}
      />
    </Box>
  );
};

RangeDatePickerBox.displayName = "RangeDatePickerBox";
