import { RolesType } from "@/utils/constant/roles";

//TODO : move this to service/model
export interface User {
  user_id: string;
  user_name: string;
  role: RolesType
  [key: string]: any;
}
