// import {
//   MobileNumberInputBox,
//   NumericInputBox,
//   PhoneNumberInputBox,
//   RangeDatePickerBox,
// } from "@/components/ui/input-box";
import { Text } from "@/components/ui/text/Text";
import { Container, Stack } from "@mui/material";




const HomePage = () => {


  return (
    <Container sx={{ py: 4 }}>
     
      <Stack spacing={5}>
       <Text>Text</Text>
       <Text variant="b1">Text</Text>
       <Text variant="h1">Text</Text>
       <Text variant="b2-bold">Text</Text>
      </Stack>
    </Container>
  );
};

export default HomePage;
