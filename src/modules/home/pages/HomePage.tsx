import { CheckBoxForm } from "@/components/ui/check-box/CheckBoxForm";
import { RadioBox } from "@/components/ui/radio-box/RadioBox";
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
