import { CheckBoxForm } from "@/components/ui/check-box/CheckBoxForm";
import { CustomMenuDatePicker } from "@/components/ui/date-picker/CustomMenuDatePicker";
import { DatePickerBox } from "@/components/ui/date-picker/DatePickerBox";
import { RangeDatePickerBox } from "@/components/ui/date-picker/RangeDatePickerBox";
import { RadioBoxGroupOption } from "@/components/ui/radio-box/RadioBoxGroup";
import { Container, Stack } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const op: RadioBoxGroupOption[] = [
  { id: 1, label: "لیبل ۱", value: "l1" },
  { id: 2, label: "2 لیبل", value: "l2" },
  // { id: 3, label: "لیبل 3", value: "l3" },
  // { id: 4, label: "لیبل 4", value: "l4" },
];
const opp = [
  { id: 1, label: "لیبل ۱", value: "l1", showCalendar: false },
  { id: 2, label: "2 لیبل", value: "l2", showCalendar: false },
  { id: 3, label: "3 لیبل", value: "l3", showCalendar: false },
  { id: 4, label: "4 لیبل", value: "l4", showCalendar: true },
];

type FormValue = {
  check: boolean;
};
const HomePage = () => {
  const [p, setP] = useState("");

  console.log("value", p);

  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      check: false,
    },
  });

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    console.log(data);
  };

  return (
    <Container sx={{ py: 4 }}>
      <DatePickerBox />
      <RangeDatePickerBox />
      <CustomMenuDatePicker options={opp} />
      <Stack spacing={5} component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <CheckBoxForm
          name="check"
          control={control}
          label="asdsad"
          rules={{
            required: { value: true, message: "asdsadsad" },
          }}
        />
        <button type="submit">submit</button>
        {/* <RadioBox label="لیبل تکست" />
        <RadioBox color="primary" label="لیبل تکست" />
        <RadioBox disabled label="لیبل تکست" />
        <RadioBox disabled color="primary" label="لیبل تکست" />
        <RadioBox disabled label="لیبل تکست" /> */}
      </Stack>
    </Container>
  );
};

export default HomePage;
