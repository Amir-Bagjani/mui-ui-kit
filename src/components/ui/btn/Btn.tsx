import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { Button, CircularProgress, SxProps, Theme } from "@mui/material";

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

const SizeMap = {
  small: 158,
  medium: 223,
  large: 280,
};

export const Btn = forwardRef<HTMLButtonElement, BtnProps>(
  (
    {
      variant = "contained",
      size = "medium",
      color = "primary",
      loading,
      startIcon,
      endIcon,
      sx = [],
      disabled,
      ...props
    },
    ref
  ) => {
    const width = SizeMap[size] || 128;

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        color={color}
        startIcon={
          loading ? <CircularProgress size={15} color="inherit" /> : startIcon
        }
        endIcon={endIcon}
        sx={[
          {
            width,
            height: 48,
            borderRadius: 2,
            boxShadow: "none",
            ":hover": { boxShadow: "none" },
            ":disabled": {
              bgcolor: `${color}.light`,
              color: "common.white",
            },
            ...(variant === "outlined" && {
              color: "black.900",
              borderColor: "black.900",
              ":hover": {
                bgcolor: "transparent",
              },
              ":disabled": {
                borderColor: "grey.100",
                color: "grey.100",
                bgcolor: "grey.600",
              },
            }),
            ...(variant === "text" && {
              width: 128,
              color: "primary.main",
              ":hover": {
                bgcolor: "transparent",
              },
              ":disabled": {
                color: "primary.300",
              },
            }),
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        disableRipple
        disabled={disabled || loading}
        {...props}
      />
    );
  }
);

Btn.displayName = "Btn";
