// import {
//   MobileNumberInputBox,
//   NumericInputBox,
//   PhoneNumberInputBox,
//   RangeDatePickerBox,
// } from "@/components/ui/input-box";
import { Pagination } from "@/components/pagination/Pagination";
import { CustomToast } from "@/components/toast/CustomToast";
import { Text } from "@/components/ui/text/Text";
import { Container, Stack } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

const notify = () => {
  toast.custom((props) => <CustomToast {...props} />, {
    duration: 5005430,
  });
};
const notifyerrortext = () => {
  toast.custom((props) => <CustomToast {...props} text="54654asd465sa4d56" status="success" />, {
    duration: 5005430,
  });
};
const notifyerror = () => {
  toast.custom((props) => <CustomToast {...props} status="error" />, {
    duration: 5005430,
  });
};
const notifCustom = () => {
  toast.custom(
    (props) => (
      <CustomToast
        {...props}
        status="error"
        renderMsg={() => <div>"asdsaasdasasd"</div>}
      />
    ),
    {
      duration: 5005430,
    }
  );
};
const notifCustomsucc = () => {
  toast.custom(
    (props) => (
      <CustomToast
        {...props}
        status="success"
        renderMsg={() => <div>"asds546aasdasasd"</div>}
      />
    ),
    {
      duration: 5005430,
    }
  );
};

/**
 * 
 
 * 
 * import toast, { Toaster } from "react-hot-toast";

const notify = () => {
  toast.custom(
    (t) => (
      <div
        style={{
          opacity: t.visible ? 1 : 0,
          transition: "opacity 100ms ease-in-out"
        }}
      >
        <b>Here is your toast.</b>
        <button onClick={() => toast.dismiss(t.id)}>X</button>
      </div>
    ),
    {
      duration: 5000
    }
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>react-hot-toast – Custom Toast Dismiss</h1>
      <button onClick={notify}>Make custom toast</button>
      <Toaster position="bottom-center" />
    </div>
  );
}
 */

const HomePage = () => {
  const [p, setP] = useState(1);
  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={5}>
        <Pagination
          currentPage={p}
          lastPage={20}
          onChange={setP}
          maxLength={5}
        />
        <Text onClick={notify}>Text</Text>
        <Text onClick={notifyerrortext} color="primary">
          Text text
        </Text>
        <Text onClick={notifyerror} color="primary">
          Text
        </Text>
        <Text onClick={notifCustom} variant="b1">
          Text
        </Text>
        <Text onClick={notifCustomsucc} color="black-300" variant="b1">
          Text
        </Text>
        <Text variant="h1">Text</Text>
        <Text color="black-900" variant="h1">
          Text
        </Text>
        <Text variant="b2-bold">Text</Text>
        <Text color="grey-400" variant="b2-bold">
          Text
        </Text>
      </Stack>
    </Container>
  );
};

export default HomePage;
