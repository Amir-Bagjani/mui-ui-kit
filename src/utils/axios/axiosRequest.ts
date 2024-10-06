import memoize from "memoizee";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

//utils
import { API } from "@/service/api";
import { ROUTES_NAME } from "@/utils/routeNames";
import { MAIN_SETTING } from "@/utils/mainSettings";
import { clearToken, getToken, storeToken } from "@/utils/token";

const client = axios.create({
  baseURL: MAIN_SETTING.BASE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// memoized to prevent race conditions
const refreshToken = memoize(
  async function refreshTokenFn() {
    try {
      const tokensData = getToken();

      const response = await API.users.getRefreshToken(tokensData);
      storeToken(response.access_token, response.refresh_token);
      //   storeToken(response.data.access_token, response.data.refresh_token);

      return response;
    } catch (error) {
      clearToken();
      window.location.href = ROUTES_NAME.authentication.login;
      return Promise.reject(error);
    }
  },
  { promise: true, maxAge: 5000 }
);

//set token in header
client.interceptors.request.use(
  (config) => {
    const tokensData = getToken();

    config.headers["Authorization"] = `Bearer ${tokensData.access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.request.responseURL.search("/users/login/") === -1
    ) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        return client(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const request = async <Data, Error>({
  ...options
}: AxiosRequestConfig<Data>) => {
  const onSuccess = (response: AxiosRequestConfig<Data>) =>
    Promise.resolve(response.data);

  const onError = async (error: AxiosError<Error>) => {
    return Promise.reject(error.response?.data);
  };

  return client(options).then(onSuccess).catch(onError);
};
