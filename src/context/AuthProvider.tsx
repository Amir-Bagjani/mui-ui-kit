import {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";

//utils
import { useGetProfileAPI } from "@/hooks/api/useGetProfileAPI";
import { clearToken, getToken, storeToken } from "@/utils/token";

//types
import { User } from "@/models/user.type";
import { PostLoginResponse } from "@/service/model/users/loginUser";

export type AuthStatus = "pending" | "idle";
interface AuthContextType {
  user: User | null;
  login: (data: PostLoginResponse) => void;
  logout: () => void;
  status: AuthStatus;
}

export const ROUTE_AUTH_STATUS = {
  PENDING: "pending",
  IDLE: "idle",
} as const;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>({
    token_type: "access",
    exp: 1727521120,
    iat: 1726657120,
    jti: "543dbc47006345a4944262d0f8e9f660",
    user_id: "1361359381",
    first_name: "کاربر",
    last_name: "مالی",
    user_name: "testmalii",
    software: "rfap",
    platform: "portal",
    is_verified: true,
    role: "receiptionict",
    has_profile: true,
    expense_registration_is_allowed: true,
    complaint_registration_is_allowed: false,
    complaint_registration_is_allowed_for_other_Insurances: true,
    is_pishkhan_admin: false,
    has_active_contract: true,
    use_incident: false,
  });
  const [status, setStatus] = useState<AuthStatus>(ROUTE_AUTH_STATUS.PENDING);

  const login = useCallback((data: PostLoginResponse) => {
    setStatus(ROUTE_AUTH_STATUS.IDLE);
    storeToken(data.access_token, data.refresh_token);
    setUser({ user_id: data.user_id, user_name: data.user_name });
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const onMutate = useCallback(() => {
    setUser(null);
    setStatus(ROUTE_AUTH_STATUS.PENDING);
  }, []);
  const onSuccess = useCallback((d: User) => {
    setUser(d);
    setStatus(ROUTE_AUTH_STATUS.IDLE);
  }, []);
  const onError = useCallback(() => {
    setUser(null);
    setStatus(ROUTE_AUTH_STATUS.IDLE);
    clearToken();
  }, []);

  const { mutate: fetchProfile } = useGetProfileAPI({
    onMutate,
    onSuccess,
    onError,
    retry: false,
  });

  useEffect(() => {
    // const { access_token } = getToken();
    // if (access_token !== "") {
    //   fetchProfile({});
    // } else {
    //   setStatus(ROUTE_AUTH_STATUS.IDLE);
    // }
    setStatus(ROUTE_AUTH_STATUS.IDLE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ user, login, logout, status }),
    [login, logout, status, user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
