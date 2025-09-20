import type { BaseFormLayoutProps } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { emailFormSchema } from "./formSchema";
import { authApi } from "@/entities/user";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/router/constants";

export const useForgotPassword = () => {
  type FormData = z.infer<typeof emailFormSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(emailFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const {
    formState: { isValid, isDirty, isSubmitting },
  } = form;

  const onSubmit = async (data: FormData) => {
    try {
      await authApi.forgotPassword(data);
      setButtonDisabled(true);
      toast.success("We sent the link on your email to reset password");
      setTimeout(() => {
        navigate(ROUTES.SIGNIN);
      }, 4000);
    } catch (err) {
      toast.error("Can not find your email");
    }
  };

  return { form, onSubmit, isDirty, isValid, isSubmitting, buttonDisabled };
};
