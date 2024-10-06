import {
  Box,
  Theme,
  Select,
  SxProps,
  MenuItem,
  IconButton,
  SelectProps,
  ListItemText,
} from "@mui/material";
import { ComponentProps, forwardRef, ReactNode, useState } from "react";

//components
import { ArrowLeftBoldIcon } from "@/assets/icons/ArrowLeftBoldIcon";
import { ArrowDownBoldIcon } from "@/assets/icons/ArrowDownBoldIcon";

//types
import { Override } from "@/models/override";

export type SelectBoxOption = {
  id: string | number;
  label: string;
  value: any;
};
export type SelectBoxProps = Override<
  SelectProps,
  {
    options: Array<SelectBoxOption>;
    sx?: SxProps<Theme>;
    label?: string;
    labelProps?: ComponentProps<typeof Box<"span">>;
    helperText?: ReactNode;
  }
>;

export const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  (props, ref) => {
    const {
      options,
      label,
      labelProps,
      sx = [],
      helperText,
      ...restProps
    } = props;

    const [showPlaceHolder, setShowPlaceholder] = useState(true);

    const disabled = props.disabled;
    const error = props.error;
    const fullWidth = props.fullWidth;

    return (
      <label
        style={{ position: "relative", width: fullWidth ? "100%" : "280px" }}
      >
        <Box
          component="span"
          sx={{
            mb: 0.5,
            display: "block",
            marginInlineStart: 0.5,
            fontSize: 12,
            color: props.disabled ? "grey.100" : "black.500",
          }}
          {...labelProps}
        >
          {label}
        </Box>
        {props?.placeholder && showPlaceHolder ? (
          <Box
            component="span"
            sx={{
              position: "absolute",
              zIndex: disabled ? 2 : -2,
              top: "2.1rem",
              left: "1.25rem",
              color: "grey.100",
            }}
          >
            {props.placeholder}
          </Box>
        ) : null}
        <Select
          ref={ref}
          onChange={(selectEvent, child) => {
            props.onChange?.(selectEvent, child);
            setShowPlaceholder(selectEvent.target.value === "");
          }}
          renderValue={(v) => <>{v}</>}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  borderRadius: "0 0 8px 8px",
                  mt: 0.4,
                  boxShadow: "0 2px 6px 2px #00000026, 0 1px 2px 0 #0000004D",
                },
              },
            },
          }}
          defaultValue=""
          IconComponent={(p) => (
            <IconButton {...p}>
              <ArrowDownBoldIcon />
            </IconButton>
          )}
          sx={[
            {
              width: 1,
              borderRadius: 2,
              height: 48,

              "&.Mui-focused": {
                borderRadius: "8px 8px 0 0",
              },

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey.200",
              },

              "&:hover:not(.Mui-focused)": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black.900",
                  boxShadow: "0px 8px 16px 0px #A8A8A83D",
                },
              },

              "&.Mui-error": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "error.main",
                },

                ".MuiSelect-icon": {
                  path: {
                    fill: (t) => t.palette.error.main,
                  },
                },
                ".MuiSelect-iconOpen": {
                  path: {
                    fill: (t) => t.palette.error.main,
                  },
                },
              },

              "&.Mui-disabled": {
                bgcolor: "grey.500",
                border: "none",

                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  boxShadow: "unset",
                },

                ".MuiSelect-icon": {
                  path: {
                    fill: (t) => t.palette.grey[200],
                  },
                },
              },

              ".MuiSelect-icon": {
                mt: -0.9,
              },

              ".MuiSelect-iconOpen": {
                transform: "rotate(180deg)",
                transition: "transform 0.2s",
                mt: -1.1,

                path: {
                  fill: (t) => t.palette.primary.main,
                },
              },
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
          {...restProps}
        >
          {options.map((o) => (
            <MenuItem key={o.id} value={o.value}>
              <IconButton disableRipple sx={{ marginInlineEnd: 0.4 }}>
                <ArrowLeftBoldIcon />
              </IconButton>
              <ListItemText primary={o.label} />
            </MenuItem>
          ))}
        </Select>
        {helperText ? (
          <Box
            component="span"
            sx={{
              display: "block",
              color: error ? "error.main" : disabled ? "grey.100" : "black.500",
              fontSize: 12,
              marginInlineStart: 1.5,
              mt: 0.5,
            }}
          >
            {helperText}
          </Box>
        ) : null}
      </label>
    );
  }
);
