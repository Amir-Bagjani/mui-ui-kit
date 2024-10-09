import { APP_TYPE } from "../appType";
import { DAY_STAGE_SETTINGS } from "./dayStage";
import { DAY_PRODUCTION_SETTINGS } from "./dayProduction";

export const CONTROLLER_SETTING = {
  [APP_TYPE.DAY_STAGE]: DAY_STAGE_SETTINGS,
  [APP_TYPE.DAY_PRODUCTION]: DAY_PRODUCTION_SETTINGS,
};
