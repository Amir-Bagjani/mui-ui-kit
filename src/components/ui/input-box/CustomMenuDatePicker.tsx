import {
  Box,
  List,
  Stack,
  Theme,
  Popover,
  SxProps,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, DateObject } from "react-multi-date-picker";

//components
import { Btn, BtnProps } from "@/components/ui/btn";
import { ChevronLeftIcon } from "@/assets/icons/ChevronLeftIcon";
import { ChevronDownIcon } from "@/assets/icons/ChevronDownIcon";
import { CheckPrimaryIcon } from "@/assets/icons/CheckPrimaryIcon";
import { ChevronRightIcon } from "@/assets/icons/ChevronRightIcon";
import { CheckPrimaryDisabledIcon } from "@/assets/icons/CheckPrimaryDisabledIcon";

//utils
import { useMenu } from "@/hooks/common/useMenu";
import { useModal } from "@/hooks/common/useModal";

export type CustomMenuDatePickerData = {
  id: number;
  label: string;
  value: any;
  showCalendar: boolean;
};
export type CustomMenuDatePickerProps<D extends CustomMenuDatePickerData> = {
  value?: D;
  onChange?: (value: D) => void;
  options: D[];
  disabled?: boolean;
  btnProps?: BtnProps;
};

const weekDays = [
  ["sat", "ش"],
  ["sun", "ی"],
  ["mon", "د"],
  ["tue", "س"],
  ["wed", "چ"],
  ["thu", "پ"],
  ["fri", "ج"],
];

const styles: SxProps<Theme> = {
  ".rmdp-wrapper": {
    borderRadius: 0,
    boxShadow: "none",

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
};

export const CustomMenuDatePicker = <D extends CustomMenuDatePickerData>({
  value,
  onChange,
  options,
  disabled,
  btnProps,
}: CustomMenuDatePickerProps<D>) => {
  const [val, setVal] = useState(value || options[0]);
  const [date, setDate] = useState<DateObject[]>([]);

  const {
    isOpen: isSelectOpen,
    anchorEl: anchorSelectEl,
    onClose: onSelectClose,
    onOpen: onSelectOpen,
  } = useMenu();
  const {
    isOpen: isCalendarOpen,
    onClose: onCalendarClose,
    onOpen: onCalendarOpen,
  } = useModal();

  const handleCloseSelect = () => {
    onCalendarClose();
    onSelectClose();
    if (val.showCalendar && date.length !== 2) {
      setDate([]);
      setVal(options[0]);
    }
  };

  const handleChange = (value: D) => {
    if (value.showCalendar) {
      onChange?.({ ...value, value: date });
    } else {
      onChange?.(value);
      setDate([]);
    }

    setVal(value);
  };

  return (
    <div>
      <Btn
        variant="outlined"
        size="small"
        endIcon={
          <ChevronDownIcon
            style={{
              transform: isSelectOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        }
        disabled={disabled}
        {...btnProps}
        sx={[
          {
            width: 96,
            height: 36,
            minWidth: "fit-content",
          },
          ...(Array.isArray(btnProps?.sx) ? btnProps.sx : [btnProps?.sx]),
        ]}
        onClick={(e) => {
          onSelectOpen(e);
          btnProps?.onClick?.(e);
        }}
      >
        {val.label}
      </Btn>
      <Popover
        open={isSelectOpen}
        anchorEl={anchorSelectEl}
        onClose={handleCloseSelect}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "6px",
              boxShadow: "0 -2px 4px 0 #7070700F, 0 4px 8px 0 #7070701F",
              border: 1,
              borderColor: "grey.A200",
              mt: 0.3,
            },
          },
        }}
      >
        <Stack direction="row">
          <Box
            sx={{
              display: isCalendarOpen ? "block" : "none",
              ...styles,
            }}
          >
            <Calendar
              value={date}
              onChange={(d) => {
                setDate(d);
                setVal((p) => ({
                  ...p,
                  label: d.reverse().toString().replace(",", " - "),
                }));
              }}
              format="YYYY/MM/DD"
              className="green"
              monthYearSeparator=" "
              showOtherDays
              headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
              weekDays={weekDays}
              locale={persian_fa}
              calendar={persian}
              range
              rangeHover
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
            />
            {date.length > 0 && (
              <Stack
                sx={{
                  borderTop: (t) => `1px solid ${t.palette.grey[300]}`,
                  px: 2,
                  py: 1,
                }}
                direction="row"
                justifyContent="space-between"
              >
                <Box>
                  {date?.[0]?.format()}
                  {date.length > 1 && " - "}
                  {date?.[1]?.format()}
                </Box>
                {date.length === 0 ? (
                  ""
                ) : date.length !== 2 ? (
                  <CheckPrimaryDisabledIcon />
                ) : (
                  <CheckPrimaryIcon />
                )}
              </Stack>
            )}
          </Box>

          <List
            sx={{
              p: 0,
              width: 1,
              bgcolor: "background.paper",
              ...(isCalendarOpen && {
                borderInlineStart: (t) => `1px solid ${t.palette.grey[300]}`,
              }),
              ".MuiButtonBase-root:not(:last-child)": {
                borderBottom: (t) => `1px solid ${t.palette.grey[300]}`,
              },
            }}
            aria-labelledby="nested-list-subheader"
          >
            {options.map((o) => (
              <ListItemButton
                key={o.id}
                sx={{
                  ...(isCalendarOpen &&
                    o.showCalendar && {
                      bgcolor: "primary.main",
                      color: "#FFF",
                      ":hover": {
                        bgcolor: "primary.main",
                      },
                    }),
                }}
              >
                <ListItemText
                  sx={{
                    minWidth: "max-content",
                    ".MuiTypography-root": { fontSize: "14px" },
                  }}
                  primary={o.label}
                  onClick={() => {
                    handleChange(o);

                    if (o.showCalendar) {
                      onCalendarOpen();
                    } else {
                      handleCloseSelect();
                    }
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </Popover>
    </div>
  );
};

CustomMenuDatePicker.displayName = "CustomMenuDatePicker";
