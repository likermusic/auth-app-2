import type { RouteNames } from "@/shared/types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ValidationFormFieldsTypes } from "../types";
import type { SigninFormSchema, SignupFormSchema } from "./formSchema";
import type { z } from "zod";
import { authApi } from "@/entities/user";
import * as Cookies from "js-cookie";
import { ROUTES } from "@/shared/router/constants";
import type { AxiosError } from "axios";
import { toast } from "sonner";

// type Routes = `${RouteNames}`; // 'signin' | 'signup'

export const useAuth = (ROUTE_VALUE: `${RouteNames}`) => {
  const navigate = useNavigate();
  const [serverValidationErrors, setServerValidationErrors] =
    useState<ValidationFormFieldsTypes | null>(null);

  const authHandler = async (
    data: z.infer<typeof SigninFormSchema> | z.infer<typeof SignupFormSchema>,
  ) => {
    try {
      const resp = await authApi[ROUTE_VALUE](data);
      if (!resp.data.token) throw new Error("Token not found");
      Cookies.default.set("token", resp.data.token, {
        expires: 1 / 24,
      });
      navigate(ROUTES.HOME);
    } catch (err) {
      const error = err as AxiosError<{
        error: string | ValidationFormFieldsTypes;
      }>;

      if (error.response?.data.error instanceof Object) {
        setServerValidationErrors(error.response?.data.error);
      } else {
        toast.error(error.response?.data.error);
      }
    }
  };

  return { authHandler, serverValidationErrors };
};
