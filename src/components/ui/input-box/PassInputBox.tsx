import { FC, useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";

//components
import { PassBoldIcon } from "@/assets/icons/PassBoldIcon";
import { RootInputBox, RootInputBoxProps } from "./RootInputBox";

//types
import { Override } from "@/models/override";

export type PassInputBoxProps = Override<
  RootInputBoxProps,
  {
    type?: "password";
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onRemovePassword?: (removeIconCb: () => void) => void;
  }
>;

export const PassInputBox: FC<PassInputBoxProps> = ({
  type = "password",
  onChange,
  onRemovePassword,
  ...props
}) => {
  const [showPassBtn, setShowPassBtn] = useState(false);

  const _onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (...e) => {
    onChange?.(...e);

    if (e[0].target.value) {
      setShowPassBtn(true);
    } else {
      setShowPassBtn(false);
    }
  };

  const _onRemovePassword: () => void = () => {
    onRemovePassword?.(() => setShowPassBtn(false));
  };

  return (
    <RootInputBox
      slotProps={{
        input: {
          sx: {
            borderRadius: 2,
            px: 1,
            height: 48,
          },
          endAdornment: showPassBtn ? (
            <InputAdornment position="end">
              <IconButton disableRipple onClick={_onRemovePassword}>
                <PassBoldIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
      onChange={_onChange}
      {...props}
      type={type}
    />
  );
};

PassInputBox.displayName = "PassInputBox";
