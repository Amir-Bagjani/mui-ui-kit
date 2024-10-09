import toast from "react-hot-toast";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

//utils
import { MAIN_SETTING } from "@/app-setting/mainSettings";

//types
import { ReactQuerySideEffect } from "@/models/reactQuerySideEffect.types";

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: {
      showGlobalErrorToast?: boolean;
      showGlobalSuccessToast?: boolean;
    };
    queryMeta: ReactQuerySideEffect;
  }
}

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError(_error, _variables, _context, mutation) {
      if (mutation.meta?.showGlobalErrorToast) {
        toast.error(MAIN_SETTING.PUBLIC_FETCH_ERROR);
      }
    },
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.showGlobalSuccessToast) {
        toast.success(MAIN_SETTING.PUBLIC_FETCH_SUCCESS);
      }
    },
  }),
  queryCache: new QueryCache({
    onError: (error, query) => {
      query.meta?.onError?.(error, query);
    },
    onSuccess: (data, query) => {
      query.meta?.onSuccess?.(data, query);
    },
    onSettled: (data, error, query) => {
      query.meta?.onSettled?.(data, error, query);
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
