import { AxiosError } from "axios";
import type { SignupFormSchema } from "./formSchema";
import type { z } from "zod";
import { authApi } from "@/entities/user";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/router/constants";
import { toast } from "sonner";
import * as Cookies from "js-cookie";
import { useState } from "react";
import type { FormFieldsTypes } from "../types";

export const useSignup = () => {
  const [serverValidationErrors, setServerValidationErrors] =
    useState<FormFieldsTypes | null>(null);

  const navigate = useNavigate();

  const signupHandler = async (data: z.infer<typeof SignupFormSchema>) => {
    try {
      // await new Promise((res) => {
      //   setTimeout(() => {
      //     res();
      //   }, 3000);
      // });
      // throw new Error();
      const resp = await authApi.signup(data);

      if (!resp.data.token) throw new Error("Token not found");
      Cookies.default.set("token", resp.data.token, {
        expires: 1 / 24,
      });
      // navigate(ROUTES.HOME);
    } catch (err) {
      const error = err as AxiosError<{
        error: FormFieldsTypes | string;
      }>;
      if (error.response?.data.error instanceof Object) {
        setServerValidationErrors(error.response.data.error);
      } else {
        toast.error(error.response?.data.error);
      }
    }
  };
  return { signupHandler, serverValidationErrors };
};
