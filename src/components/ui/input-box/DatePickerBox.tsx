import DatePicker from "react-multi-date-picker";
import { ComponentProps, FC, forwardRef, ReactNode } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Box, IconButton, InputAdornment } from "@mui/material";

//components
import { CalenderIcon } from "@/assets/icons/CalenderIcon";
import { ChevronLeftIcon } from "@/assets/icons/ChevronLeftIcon";
import { RootInputBox, RootInputBoxProps } from "./RootInputBox";
import { ChevronRightIcon } from "@/assets/icons/ChevronRightIcon";

//types
import { Override } from "@/models/override";

export type DatePickerBoxProps = Override<
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

const weekDays = [
  ["sat", "ش"],
  ["sun", "ی"],
  ["mon", "د"],
  ["tue", "س"],
  ["wed", "چ"],
  ["thu", "پ"],
  ["fri", "ج"],
];

export const DatePickerBox = forwardRef<HTMLInputElement, DatePickerBoxProps>(
  (
    {
      format = "YYYY/MM/DD",
      placeholder = "روز / ماه / سال",
      label,
      fullWidth,
      helperText,
      error,
      inputProps,
      ...props
    },
    ref
  ) => {
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
            ".rmdp-day:": {
              color: "black.700",
            },
            ".rmdp-deactive": {
              color: "grey.200",
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
          renderButton={(direction, handleClick) => {
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
            return (
              <RootInputBox
                ref={ref}
                label={label}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    ".MuiIconButton-root": {
                      path: {
                        fill: (t) => t.palette.grey[200],
                      },
                    },
                    "&.Mui-focused": {
                      borderRadius: "8px 8px 0 0",

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
                      borderRadius: 2,
                      px: 1,
                      height: 48,
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton disableRipple>
                          <CalenderIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                autoComplete="off"
                placeholder={placeholder}
                value={value}
                disabled={props.disabled}
                {...inputProps}
                // these lines should place after spread props
                error={error}
                helperText={helperText}
                onFocus={(e) => {
                  inputProps?.onFocus?.(e);
                  openCalendar();
                }}
                onChange={(e) => {
                  if (
                    new RegExp(/\d{4}-\d{1,2}-\d{1,2}/).test(e.target.value)
                  ) {
                    inputProps?.onChange?.(e);
                    handleValueChange(e);
                  }
                }}
              />
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
          {...props}
        />
      </Box>
    );
  }
);

DatePickerBox.displayName = "DatePickerBox";
