import { APP_TYPE } from "./appType";

export const BASE_API_URL = {
  [APP_TYPE.DAY_STAGE]: "https://backend-stage.rfap.ir/",
  [APP_TYPE.DAY_PRODUCTION]: "https://darmanapi.rfap.ir/",
} as const;
