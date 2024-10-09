import {
  RadioBoxGroup,
  RadioBoxGroupOption,
} from "@/components/ui/radio-box/RadioBoxGroup";
import { Container, Stack } from "@mui/material";
import { useState } from "react";

const op: RadioBoxGroupOption[] = [
  { id: 1, label: "لیبل ۱", value: "l1" },
  { id: 2, label: "2 لیبل", value: "l2" },
  // { id: 3, label: "لیبل 3", value: "l3", disabled: true },
  // { id: 4, label: "لیبل 4", value: "l4", error: true },
];
const HomePage = () => {
  const [p, setP] = useState("");

  console.log("value", p);

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={5}>
        <RadioBoxGroup
          options={op}
          disabled
          helperText="asdas asd"
          value={p}
          color="primary"
          onChange={setP}
          label="حقیقی حقوقی"
          // helperText="حقیقی"
          radioListProps={{
            width: 280
          }}
        />

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
