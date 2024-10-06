const AccessTokenKey = "accessToken";
const RefreshTokenKey = "refreshToken";

export const getToken = () => {
  const access_token = localStorage.getItem(AccessTokenKey);
  const refresh_token = localStorage.getItem(RefreshTokenKey);
  return {
    access_token: access_token || "",
    refresh_token: refresh_token || "",
  };
}; 

export const storeToken = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(AccessTokenKey, accessToken);
  localStorage.setItem(RefreshTokenKey, refreshToken);
};

export const clearToken = () => {
  localStorage.removeItem(AccessTokenKey);
  localStorage.removeItem(RefreshTokenKey);
};
