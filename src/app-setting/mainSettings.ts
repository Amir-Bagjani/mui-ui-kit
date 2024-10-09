import { APP_TYPE } from "./appType";
import { CONTROLLER_SETTING } from "./controller";
import { DAY_INSURER } from "@/utils/constant/insurers";

type AppTypeKeys = keyof typeof APP_TYPE;

const selectedAppType = import.meta.env?.VITE_APP_TYPE
  ? APP_TYPE[import.meta.env?.VITE_APP_TYPE as AppTypeKeys]
  : APP_TYPE.DAY_STAGE;

export const MAIN_SETTING = {
  ...CONTROLLER_SETTING[selectedAppType],
  isDayInsurer: function () {
    return this.APP_INSURER === DAY_INSURER;
  },
};
