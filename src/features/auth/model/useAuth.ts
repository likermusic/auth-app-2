import type { RouteNames } from "@/shared/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ValidationFormFieldsTypes } from "../types";
import type { SigninFormSchema, SignupFormSchema } from "./formSchema";
import type { z } from "zod";
import { authApi } from "@/entities/user";
// import * as Cookies from "js-cookie";
import { ROUTES } from "@/shared/router/constants";
import type { AxiosError } from "axios";
import { toast } from "sonner";

// type Routes = `${RouteNames}`; // 'signin' | 'signup'

export const useAuth = (ROUTE_VALUE: `${RouteNames}`) => {
  const navigate = useNavigate();
  const [serverValidationErrors, setServerValidationErrors] =
    useState<ValidationFormFieldsTypes | null>(null);

  // type FormSchema = typeof ROUTE_VALUE extends RouteNames.Signin
  //   ? typeof SigninFormSchema
  //   : typeof ROUTE_VALUE extends RouteNames.Signup

  const location = useLocation();
  useEffect(() => {
    if (
      location.state?.isPasswordReset &&
      location.state.isPasswordReset === true
    ) {
      toast.success("Password is updated. Sign in with a new password");
      const newState = { ...location.state };
      delete newState.isPasswordReset;
      navigate(location.pathname, {
        replace: true,
        state: Object.keys(newState).length > 0 ? newState : undefined,
      });
    }
  }, []);

  const authHandler = async (
    data: z.infer<typeof SigninFormSchema> | z.infer<typeof SignupFormSchema>,
  ) => {
    try {
      await authApi[ROUTE_VALUE](data);
      // if (!resp.data.token) throw new Error("Token not found");

      // Cookies.default.set("token", resp.data.token, {
      //   expires: 1 / 24,
      // });

      // Cookies.set("token", resp.data.token, {
      //   expires: 1 / 24, // 1 час (если expires в днях)
      // });
      // Cookies.set("token", resp.data.token, {
      //   expires: new Date(Date.now() + 3600 * 1000),
      // }); // 1 час
      navigate(ROUTES.HOME);
      // location.replace("/");
    } catch (err) {
      const error = err as AxiosError<{
        error: string | ValidationFormFieldsTypes;
      }>;

      if (error.response?.data.error instanceof Object) {
        setServerValidationErrors(error.response?.data.error);
      } else {
        console.log(error.response?.data.error);
        toast.error("Authorization error. Try again");
      }
    }
  };

  return { authHandler, serverValidationErrors };
};
