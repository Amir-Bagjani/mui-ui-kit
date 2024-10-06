import { LoaderPinwheelIcon } from "@/assets/icons/LoaderPinwheelIcon";
import { Button } from "@mui/material";

const LoadingPage = () => {
  return (
    <div
      className={`flex min-h-screen w-full`}
    >
      <div className="flex h-screen w-full items-center justify-center">
        <div className="space-y-4 text-center">
          <LoaderPinwheelIcon className="h-12 w-12 animate-spin text-primary" />
          <h2 className="text-2xl font-bold">Loading...</h2>
          <p className="text-muted-foreground">
            Please wait while we prepare your content.
          </p>
          <Button >
            Toggle theme Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
