import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import {
  ChangeEventHandler,
  ComponentProps,
  FC,
  FormEventHandler,
  useState,
} from "react";

//components
import { PassBoldIcon } from "@/assets/icons/PassBoldIcon";
import { RootInputBox, RootInputBoxProps } from "./RootInputBox";

//types
import { Override } from "@/models/override";

export type PhoneNumberInputBoxProps = {
  label?: string;
  error?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  containerProps?: ComponentProps<typeof Box>;
  phoneInput?: Override<
    RootInputBoxProps,
    {
      type?: "number";
      onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
      onInput?: FormEventHandler<HTMLDivElement>;
      onRemoveNumber?: (removeIconCb: () => void) => void;
    }
  >;
  codeInput?: Override<
    RootInputBoxProps,
    {
      type?: "number";
      onInput?: FormEventHandler<HTMLDivElement>;
    }
  >;
};

const styles = {
  "& .MuiOutlinedInput-root": {
    "&.Mui-disabled": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #D2D1D1",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #D2D1D1",
      },
    },
  },
};

export const PhoneNumberInputBox: FC<PhoneNumberInputBoxProps> = ({
  label,
  error,
  disabled,
  fullWidth,
  helperText,
  phoneInput = {},
  codeInput = {},
  containerProps,
}) => {
  const {
    onChange = () => {},
    onInput = () => {},
    onRemoveNumber = () => {},
    placeholder = "xxxx-xxxx",
    ...restPhoneInput
  } = phoneInput;

  const [showPassBtn, setShowPassBtn] = useState(false);

  const _onChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (...e) => {
    onChange?.(...e);

    if (e[0].target.value) {
      setShowPassBtn(true);
    } else {
      setShowPassBtn(false);
    }
  };

  const _onInput: FormEventHandler<HTMLDivElement> = (...e) => {
    onInput?.(...e);

    const target = e[0].target as HTMLInputElement;
    target.value = target.value.toString().slice(0, 8);
  };

  const codeOnInput: FormEventHandler<HTMLDivElement> = (...e) => {
    codeInput?.onInput?.(...e);

    const target = e[0].target as HTMLInputElement;
    target.value = target.value.toString().slice(0, 3);
  };

  const _onRemoveNumber: () => void = () => {
    onRemoveNumber?.(() => setShowPassBtn(false));
  };

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
      <Box
        component="span"
        sx={{
          display: "block",
          marginInlineStart: 0.5,
          fontSize: 12,
          color: disabled ? "grey.100" : "black.500",
        }}
      >
        {label}
      </Box>
      <Stack direction="row" spacing={1}>
        <RootInputBox
          dir="ltr"
          sx={{ width: 224, ...styles }}
          containerProps={{
            component: "label",
            sx: {
              width: 224,
            },
          }}
          slotProps={{
            input: {
              sx: {
                borderRadius: 2,
                height: 48,
                width: 224,
              },
              endAdornment: showPassBtn ? (
                <InputAdornment position="start">
                  <IconButton disableRipple onClick={_onRemoveNumber}>
                    <PassBoldIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
          placeholder={placeholder}
          onChange={_onChange}
          onInput={_onInput}
          disabled={disabled}
          {...restPhoneInput}
          error={error}
          type="number"
          label=""
          helperText=""
        />
        <RootInputBox
          dir="ltr"
          sx={{ width: 48, ...styles }}
          containerProps={{
            component: "label",
            sx: {
              width: 48,
            },
          }}
          slotProps={{
            input: {
              sx: {
                borderRadius: 2,
                height: 48,
                width: 48,
                input: {
                  px: 1,
                },
              },
            },
          }}
          placeholder="021"
          onInput={codeOnInput}
          disabled={disabled}
          {...codeInput}
          error={error}
          type="number"
          label=""
          helperText=""
        />
      </Stack>
      <FormHelperText
        sx={{
          display: "block",
          color: error ? "error.main" : disabled ? "grey.100" : "black.700",
          fontSize: 12,
          marginInlineStart: 1.5,
          mt: 0.5,
        }}
      >
        {helperText}
      </FormHelperText>
    </Box>
  );
};

PhoneNumberInputBox.displayName = "PhoneNumberInputBox";
