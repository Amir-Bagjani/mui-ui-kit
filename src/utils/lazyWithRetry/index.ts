import { lazy } from "react";

/**
 * based on https://maxtsh.medium.com/the-ultimate-guide-to-cache-busting-for-react-production-applications-d583e4248f02
 */

type ComponentImportType = () => Promise<{ default: React.ComponentType<any> }>;

const sessionKey = "lazyWithRetry";

export const lazyWithRetry = (
  componentImport: ComponentImportType,
  name: string
) => {
  return lazy(async () => {
    const hasRefreshed =
      globalThis.sessionStorage.getItem(`${sessionKey}-${name}`) || "false";

    try {
      globalThis.sessionStorage.setItem(`${sessionKey}-${name}`, "false");
      return await componentImport();
    } catch {
      if (hasRefreshed === "false") {
        globalThis.sessionStorage.setItem(`${sessionKey}-${name}`, "true");
        globalThis.location.reload();
      }

      if (hasRefreshed === "true") throw new Error("chunkLoadError");
    }
    return await componentImport();
  });
};
