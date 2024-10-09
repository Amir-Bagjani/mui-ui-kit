import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/context/AuthProvider";
import { RouteWrapper } from "@/routes/RouteWrapper";
import { MUIThemeProvider } from "@/theme/MuiThemeProvider";
import { queryClient } from "@/utils/reactQuerySettings";

const App = () => {
  return (
    <BrowserRouter>
      <MUIThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouteWrapper />
            <Toaster toastOptions={{ duration: 3000 }} />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </QueryClientProvider>
      </MUIThemeProvider>
    </BrowserRouter>
  );
};

export default App;
