import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { MAIN_SETTING } from "@/utils/mainSettings";
import { RouteWrapper } from "@/routes/RouteWrapper";
import { AuthProvider } from "@/context/AuthProvider";
import { queryClient } from "@/utils/reactQuerySettings";
import { MUIThemeProvider } from "@/theme/MuiThemeProvider";

const App = () => {
  return (
    <MUIThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouteWrapper />
          <Toaster toastOptions={{ duration: MAIN_SETTING.TOAST_DURATION }} />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </MUIThemeProvider>
  );
};

export default App;
