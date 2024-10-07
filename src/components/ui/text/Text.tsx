import { Theme } from "@emotion/react";
import { Override } from "@/models/override";
import { ComponentProps, forwardRef } from "react";
import { SxProps, Typography } from "@mui/material";

type TextVariant =
  | "number"
  | "big-text"
  | "h1"
  | "h2"
  | "h3"
  | "h3-bold"
  | "h4"
  | "b1"
  | "b2"
  | "b2-med"
  | "b2-bold"
  | "b3"
  | "b3-bold"
  | "c1"
  | "c1-bold";

type TextColor =
  | "black-300"
  | "black-500"
  | "black-700"
  | "black-900"
  | "grey-100"
  | "grey-200"
  | "grey-300"
  | "grey-400"
  | "grey-500"
  | "grey-600";

export type TextProps = Override<
  ComponentProps<typeof Typography>,
  {
    variant?: TextVariant;
    color?: TextColor;
  }
>;

const typographyStyle: Record<string, SxProps<Theme>> = {
  number: {
    fontWeight: 700,
    fontSize: "40px",
    lineHeight: "69px",
  },
  "big-text": {
    fontWeight: 800,
    fontSize: "32px",
    lineHeight: "55px",
  },
  h1: {
    fontWeight: 500,
    fontSize: "28px",
    lineHeight: "48px",
  },
  h2: {
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "41px",
  },
  h3: {
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "34px",
  },
  "h3-bold": {
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "34px",
  },
  h4: {
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "31px",
  },
  b1: {
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "31px",
  },
  b2: {
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "27px",
  },
  "b2-med": {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "27px",
  },
  "b2-bold": {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "27px",
  },
  b3: {
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "24px",
  },
  "b3-bold": {
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "24px",
  },
  c1: {
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "20px",
  },
  "c1-bold": {
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "20px",
  },
};

const TextColorMap = {
  "black-300": "black.300",
  "black-500": "black.500",
  "black-700": "black.700",
  "black-900": "black.900",
  "grey-100": "grey.100",
  "grey-200": "grey.200",
  "grey-300": "grey.300",
  "grey-400": "grey.400",
  "grey-500": "grey.500",
  "grey-600": "grey.600",
};

export const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ variant = "b3", sx = [], color = "black-500", ...props }, ref) => {
    return (
      <Typography
        ref={ref}
        sx={[
          {
            ...typographyStyle[variant],
            color: TextColorMap[color],
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...props}
      />
    );
  }
);
