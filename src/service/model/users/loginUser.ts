import { User } from "@/models/user.type";

export type PostLoginParams = {
  user_name: string;
  password: string;
};
export type PostLoginResponse = {
  refresh_token: string;
  access_token: string;
} & User;
