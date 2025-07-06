import { api } from "@/shared/api/axios-instance";
import type { IUser } from "../types";
import { ROUTES } from "@/shared/api/constants";
import type { AxiosResponse } from "axios";
import Cookies from "js-cookie";

interface IUserRequest extends Pick<IUser, "email" | "password"> {}

interface IUserResponse {
  id: number;
  email: string;
}
interface IUserSignupResponse {
  token: string;
  user: IUserResponse;
}

interface IUserSignupResponseError {
  error: string;
}

export const authApi = {
  signin: (data: IUserRequest) =>
    api.post<{ message: string }>(ROUTES.SIGNIN, data),
  signup: (data: IUserRequest) =>
    api.post<IUserSignupResponse>(ROUTES.SIGNUP, data),
  protected: () =>
    api.get(ROUTES.PROTECTED, {
      // headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    }),
};
