import { BASE_API_URL } from "../baseApiUrl";
import { AppSettings } from "../setting.type";

export const DAY_STAGE_SETTINGS = {
    BASE_API_URL: BASE_API_URL.day_stage,
    APP_TITLE: "بازدید اولیه آتش‌ سوزی",
    APP_INSURER:"day",
    APP_FAV_ICON: "/logo.svg",
    INSURER_LOGO: "/logo.svg",
} satisfies AppSettings;