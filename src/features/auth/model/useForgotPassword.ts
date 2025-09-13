import type { BaseFormLayoutProps } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { emailFormSchema } from "./formSchema";
import { authApi } from "@/entities/user";
import { toast } from "sonner";

export const useForgotPassword = () => {
  type FormData = z.infer<typeof emailFormSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(emailFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const {
    formState: { isValid, isDirty, isSubmitting },
  } = form;

  const onSubmit = async (data: FormData) => {
    try {
      await authApi.forgotPassword(data);
      toast.success("We sent the link on your email to reset password");
      // navigate(ROUTES.HOME);
    } catch (err) {
      toast.error("Can not find your email");
    }
  };

  return { form, onSubmit, isDirty, isValid, isSubmitting };
};
