import { TriangleAlertIcon } from "@/assets/icons/TriangleAlertIcon";
import { Button } from "@mui/material";

const ErrorBoundaryPage = () => {
  return (
    <div className={`flex min-h-screen w-full `}>
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="max-w-md space-y-6 px-4 text-center">
          <div className="flex items-center justify-center">
            <TriangleAlertIcon className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Oops, something went wrong!
          </h1>
          <p className="text-muted-foreground">
            We're sorry, but an unexpected error has occurred. Please try again
            later or contact support if the issue persists.
          </p>
          <Button>Toggle theme Mode</Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundaryPage;
