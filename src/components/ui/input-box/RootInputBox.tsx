import { ComponentProps, FC, Ref } from "react";
import { Box, Theme, SxProps, TextField } from "@mui/material";

export interface RootInputBoxProps
  extends Omit<ComponentProps<typeof TextField>, "label" | "sx"> {
  sx?: SxProps<Theme>;
  label?: string;
  labelProps?: ComponentProps<typeof Box<"span">>;
  containerProps?: ComponentProps<typeof Box<"label">>;
  containerRef?: Ref<HTMLLabelElement>;
}

export const RootInputBox: FC<RootInputBoxProps> = ({
  sx = [],
  label,
  labelProps,
  containerProps,
  containerRef,
  ...props
}) => {
  const fullWidth = props.fullWidth;

  return (
    <Box
      component="label"
      ref={containerRef}
      {...containerProps}
      sx={[
        { width: fullWidth ? 1 : 280 },
        ...(Array.isArray(containerProps?.sx)
          ? containerProps.sx
          : [containerProps?.sx]),
      ]}
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
      <TextField
        sx={[
          {
            "& .MuiOutlinedInput-root": {
              color: "black.500",

              "& .MuiOutlinedInput-input": {
                height: 15,
              },

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "grey.200",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {},
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
              },

              "&.Mui-disabled": {
                bgcolor: "grey.500",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  boxShadow: "unset",
                },
              },
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        slotProps={{
          input: {
            sx: {
              borderRadius: 2,
              px: 1,
              height: 48,
            },
          },
        }}
        {...props}
        fullWidth
      />
    </Box>
  );
};

RootInputBox.displayName = "RootInputBox";
