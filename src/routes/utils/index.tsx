import { SuspenseLoading } from "@/modules/loading-page/pages/SuspenseLoading";
import { ComponentImportType, lazyWithRetry } from "@/utils/lazyWithRetry";
import { Suspense } from "react";

export const lazyWithRetryComponent = (
  importPath: ComponentImportType,
  componentName: string
) => {
  const LazyComponent = lazyWithRetry(importPath, componentName);

  return () => (
    <Suspense fallback={<SuspenseLoading />}>
      <LazyComponent />
    </Suspense>
  );
};
