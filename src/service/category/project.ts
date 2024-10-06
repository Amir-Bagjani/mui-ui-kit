import { PREFIX_BASE_URL } from "../api";
import { AxiosHandler } from "@/utils/axios/axiosHandler";

export const blogCategory = {
  getBlogCategory: async (data) => {
    return await AxiosHandler.post(`${PREFIX_BASE_URL}/...`, data);
  },
  getBlogPost: async (params: any, signal?: AbortSignal) => {
    const { id } = params;

    return await AxiosHandler.get(`${PREFIX_BASE_URL}/...`, { signal });
  },
  
};
