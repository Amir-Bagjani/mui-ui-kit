import { ReactNode } from "react";
import { Box, Stack } from "@mui/material";
import toast, { Toast } from "react-hot-toast";

//components & utils
import { Text } from "@/components/ui/text/Text";
import { LineCloseIcon } from "@/assets/icons/LineCloseIcon";
import { LineCheckCircleIcon } from "@/assets/icons/LineCheckCircleIcon";
import { LineCloseCircleIcon } from "@/assets/icons/LineCloseCircleIcon";

type CustomToastProps = Toast & {
  status?: "error" | "success";
  text?: string;
  renderMsg?: (toastProps: Toast) => ReactNode;
};

export const CustomToast = (props: CustomToastProps) => {
  const { status = "success", text, renderMsg, ...toastProps } = props;

  const isSuccess = status === "success";

  const msg = text
    ? text
    : isSuccess
    ? " عملیات با موفقیت انجام شد"
    : "عملیات ناموفق بود";

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={4}
      sx={{
        width: 428,
        maxWidth: 0.9,
        borderRadius: 4,
        border: 2,
        borderColor: isSuccess ? "success.main" : "error.main",
        bgcolor: isSuccess ? "success.100" : "error.100",
        p: 3,
        opacity: toastProps.visible ? 1 : 0,
        transition: "opacity 100ms ease-in-out",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            bgcolor: isSuccess ? "success.main" : "error.main",
          }}
        >
          {isSuccess ? <LineCheckCircleIcon /> : <LineCloseCircleIcon />}
        </Box>
        {typeof renderMsg !== "undefined" ? (
          renderMsg(toastProps)
        ) : (
          <Text variant="b2">{msg}</Text>
        )}
      </Stack>
      <LineCloseIcon onClick={() => toast.dismiss(toastProps.id)} />
    </Stack>
  );
};
