import { ComponentProps, forwardRef } from "react";
import { Box, SxProps, Theme } from "@mui/material";

//types
import { Override } from "@/models/override";

type PageLinkProps = Override<
  ComponentProps<typeof Box<"span">>,
  {
    disabled?: boolean;
    active?: boolean;
    component?: "span";
  }
>;

const containerStyle: SxProps<Theme> = {
  position: "relative",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "transparent",
  color: "black.900",
  minWidth: 32,
  minHeight: 32,
  borderRadius: "50%",
  ":hover": {
    bgcolor: "grey.300",
  },
};

export const PageLink = forwardRef<HTMLSpanElement, PageLinkProps>(
  ({ active, disabled, component = "span", children, sx, ...props }) => {
    if (disabled) {
      return (
        <Box
          component="span"
          {...props}
          sx={[
            {
              ...containerStyle,
              cursor: "auto",
              pointerEvents: "none",
              color: "grey.100",
              path: {
                stroke: (t) =>
                  disabled ? t.palette.text.disabled : t.palette.primary.main,
              },
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          {children}
        </Box>
      );
    }

    return (
      <Box
        aria-current={active ? "page" : undefined}
        {...props}
        sx={[
          {
            ...containerStyle,
            ...(active && {
              bgcolor: "primary.main",
              color: "common.white",
              zIndex: 2,
              ":hover": {
                bgcolor: "primary.main",
                color: "common.white",
              },
            }),

            path: {
              stroke: (t) =>
                disabled ? t.palette.text.disabled : t.palette.primary.main,
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        component={component}
      >
        {children}
      </Box>
    );
  }
);
