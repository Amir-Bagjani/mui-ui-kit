import { InsurerType } from "@/utils/constant/insurers";

export interface AppSettings {
  BASE_API_URL: string;
  APP_TITLE: string;
  APP_INSURER: InsurerType;
  APP_FAV_ICON: string;
  INSURER_LOGO: string;
  COLOR_THEME?: {
    DARK: string;
    MAIN: string;
    LIGHT: string;
  };
}
