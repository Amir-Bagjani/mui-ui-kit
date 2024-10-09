import axios from "axios";

//utils
import { PREFIX_BASE_URL } from "../api";
import { MAIN_SETTING } from "@/app-setting/mainSettings";
import { AxiosHandler } from "@/utils/axios/axiosHandler";

//types
import {
  PostRefreshTokenParams,
  PostRefreshTokenResponse,
} from "../model/users/refreshToken";
import {
  GetProfileParams,
  GetProfileResponse,
} from "../model/users/userProfile";
import { APIError } from "../model/apiError";
import { PostLoginParams, PostLoginResponse } from "../model/users/loginUser";

export const users = {
  getRefreshToken: async (data: PostRefreshTokenParams) => {
    return await axios.post<PostRefreshTokenParams, PostRefreshTokenResponse>(
      `${PREFIX_BASE_URL}/users/refresh`,
      data,
      {
        baseURL: MAIN_SETTING.BASE_API_URL,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  },
  getProfile: async (data: GetProfileParams) => {
    return await AxiosHandler.post<
      GetProfileResponse,
      APIError,
      GetProfileParams
    >("/users/profile", data);
  },
  loginUser: async (data: PostLoginParams) => {
    return await AxiosHandler.post<
      PostLoginResponse,
      APIError,
      PostLoginParams
    >("/users/login", data);
  },
};
