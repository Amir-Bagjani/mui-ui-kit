import { Box } from "@mui/material";
import { ComponentProps, ReactNode } from "react";

//types
import { Override } from "@/models/override";

export type ChipProps = Override<
  ComponentProps<typeof Box>,
  {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    colorVariant?: "primary" | "secondary" | "grey";
  }
>;

const BgColorMap = {
  primary: "primary.400",
  secondary: "secondary.300",
  grey: "grey.400",
};
const ColorMap = {
  primary: "primary.dark",
  secondary: "secondary.100",
  grey: "black.500",
};

export const ChipBox = ({
  sx = [],
  colorVariant = "primary",
  startIcon,
  endIcon,
  ...props
}: ChipProps) => {
  return (
    <Box
      {...props}
      sx={[
        {
          py: "5.5px",
          px: "16px",
          maxWidth: "max-content",
          borderRadius: "60px",
          color: ColorMap[colorVariant],
          bgcolor: BgColorMap[colorVariant],
          fontWeight: "bold",
          fontSize: 12,
          cursor: "pointer",
          ...((!!startIcon || !!endIcon) && {
            display: "inline-flex",
            gap: 1,
            alignItems: "center",
          }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {startIcon}
      {props.children}
      {endIcon}
    </Box>
  );
};
