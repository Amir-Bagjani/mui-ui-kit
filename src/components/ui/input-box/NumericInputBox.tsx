import {
  NumericFormat,
  InputAttributes,
  NumericFormatProps,
} from "react-number-format";
import { ComponentProps, FC } from "react";
import { Box, FormHelperText } from "@mui/material";

//components & utils
import { numberToText } from "@/utils/number/numberToText";
import { RootInputBox, RootInputBoxProps } from "./RootInputBox";

//types
import { Override } from "@/models/override";

export type NumericInputBoxProps = Override<
  RootInputBoxProps,
  {
    onChange?: (value: number) => void;
    containerProps?: ComponentProps<typeof Box>;
    fullWidth?: boolean;
    priceToman?: boolean;
  }
>;

export const NumericInputBox: FC<NumericInputBoxProps> = ({
  onChange,
  fullWidth,
  helperText,
  containerProps,
  priceToman = true,
  ...props
}) => {
  const numberText = priceToman
    ? numberToText((props.value as number) / 10)
    : numberToText(props.value as number);

  const numTomanText = numberText === "صفر" ? "" : numberText + " تومان ";
  const numText = numberText === "صفر" ? "" : numberText;

  const error = props.error;
  const disabled = props.disabled;

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
      <NumericFormat
        onChange={(e) => {
          const value = Number(e.target.value.replaceAll(",", ""));
          onChange?.(value);
        }}
        thousandSeparator={true}
        customInput={RootInputBox as React.ComponentType<InputAttributes>}
        {...(props as NumericFormatProps)}
      />
      <FormHelperText
        sx={{
          display: "block",
          color: error ? "error.main" : disabled ? "grey.100" : "black.700",
          fontSize: 12,
          marginInlineStart: 1.5,
          mt: 0.5,
        }}
      >
        {error ? helperText : priceToman ? numTomanText : numText}
      </FormHelperText>
    </Box>
  );
};

NumericInputBox.displayName = "NumericInputBox";
