import { FC } from "react";
import { RootInputBox, RootInputBoxProps } from "./RootInputBox";

//types
import { Override } from "@/models/override";

export type TextInputBoxProps = Override<
  RootInputBoxProps,
  {
    type?: "text";
  }
>;

export const TextInputBox: FC<TextInputBoxProps> = (props) => {
  return <RootInputBox {...props} type="text" />;
};

TextInputBox.displayName = "TextInputBox";
