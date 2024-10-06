import { API } from "@/service/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

//types
import {
  GetProfileParams,
  GetProfileResponse,
} from "@/service/model/users/userProfile";
import { APIError } from "@/service/model/apiError";

type Params = GetProfileParams;
type Data = GetProfileResponse;
type Options = Omit<UseMutationOptions<Data, APIError, Params>, "mutationFn">;

export const useGetProfileAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => API.users.getProfile(params) as any,
    ...options,
  });
};
