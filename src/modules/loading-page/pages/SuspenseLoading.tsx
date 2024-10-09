import { LoaderPinwheelIcon } from "@/assets/icons/LoaderPinwheelIcon";
import { Box } from "@mui/material";

export const SuspenseLoading = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <LoaderPinwheelIcon className="h-12 w-12 animate-spin text-primary" />
    </Box>
  );
};
