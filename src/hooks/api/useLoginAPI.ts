import { API } from "@/service/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

//types
import {
  PostLoginParams,
  PostLoginResponse,
} from "@/service/model/users/loginUser";
import { APIError } from "@/service/model/apiError";

type Params = PostLoginParams;
type Data = PostLoginResponse;
type Options = Omit<UseMutationOptions<Data, APIError, Params>, "mutationFn">;

export const useLoginAPI = (options: Options = {}) => {
  return useMutation<Data, APIError, Params>({
    mutationFn: (params) => API.users.loginUser(params) as any,
    ...options,
  });
};
