import type { BaseFormLayoutProps } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { passwordFormSchema } from "./formSchema";
import { authApi } from "@/entities/user";
import { toast } from "sonner";

import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/shared/router/constants";

export const useResetPassword = () => {
  type FormData = z.infer<typeof passwordFormSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(passwordFormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const {
    formState: { isValid, isDirty, isSubmitting },
  } = form;

  const onSubmit = async (data: FormData) => {
    const token = searchParams.get("token");

    try {
      if (!data.password || !token) throw new Error("Do not access this page");
      await authApi.resetPassword({ password: data.password, token });
      navigate(ROUTES.SIGNIN, { state: { isPasswordReset: true } });
      // toast.success("Success reset password");
      // setTimeout(() => {
      // }, 4000);
    } catch (err) {
      toast.error("Can not reset password. Try agein later");
    }
  };

  return {
    form,
    onSubmit,
    isDirty,
    isValid,
    isSubmitting,
    showPassword,
    setShowPassword,
  };
};
