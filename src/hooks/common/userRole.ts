import { useCallback, useMemo } from "react";

//utils
import {
  RolesType,
  AGENT_ROLE,
  BRANCH_ROLE,
  ADJUSTER_ROLE,
} from "@/utils/constant/roles";
import { useAuth } from "@/context/AuthProvider";

export const useRole = () => {
  const { user } = useAuth();

  const includedRole = useCallback(
    (roles: Array<RolesType> = []) => {
      if (user?.user_id) return roles.includes(user?.role);
      return false;
    },
    [user?.role, user?.user_id]
  );

  return useMemo(
    () => ({
      includedRole,
      role: user?.role,
      isBranch: user?.role === BRANCH_ROLE,
      isAdjuster: user?.role === ADJUSTER_ROLE,
      isAgent: user?.role === AGENT_ROLE,
    }),
    [includedRole, user?.role]
  );
};
