// import {
//   MobileNumberInputBox,
//   NumericInputBox,
//   PhoneNumberInputBox,
//   RangeDatePickerBox,
// } from "@/components/ui/input-box";
import { CheckBox } from "@/components/ui/check-box/CheckBox";
import {
  CheckBoxGroup,
  CheckboxGroupOption,
} from "@/components/ui/check-box/CheckBoxGroup";
import { ChipBox } from "@/components/ui/chip-box/ChipBox";
import { MultiSelect } from "@/components/ui/select-box/MultiSelect";
import { Container, Stack } from "@mui/material";
import { useState } from "react";

const checkBoxOptions: CheckboxGroupOption[] = [
  { id: 0, label: "لیبل ۱", checked: false, name: "check1" },
  { id: 1, label: "لیبdل ۱", checked: false, name: "check12" },
  { id: 2, label: "لیبل 2", checked: false, name: "check233" },
  { id: 3, label: "لیبل 3", checked: false, name: "check345" },
  // { id: 4, label: "لیبل 3", checked: false, name: "check3456" },
  // { id: 4, label: "ugd 4", checked: false, name: "check4" },
  // { id: 3, label: "لیبل 4", checked: false, name: "check4" },
];

const HomePage = () => {

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={5}>
       
        <MultiSelect
          // disabled
          // error
          // removeSearchBox
          // options={values}
          // onChange={(a, b) => {
          //   setValues(a);
          //   console.log(b);
          // }}
          label="لیبل مالتی"
          placeholder="وارد کنید درست هااا"
          helperText="وارد کنید درست هااا"
        />
        
      </Stack>
    </Container>
  );
};

export default HomePage;
