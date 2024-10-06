import { DefaultError, Query } from "@tanstack/react-query";

export type ReactQuerySideEffect = {
  onError?: (
    error: DefaultError,
    query: Query<unknown, unknown, unknown>
  ) => void;
  onSuccess?: (data: unknown, query: Query<unknown, unknown, unknown>) => void;
  onSettled?: (
    data: unknown | undefined,
    error: DefaultError | null,
    query: Query<unknown, unknown, unknown>
  ) => void;
};
