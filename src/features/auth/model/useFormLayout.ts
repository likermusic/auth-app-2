import type { BaseFormLayoutProps } from "./../types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import type { SigninFormSchema, SignupFormSchema } from "./formSchema";

export const useFormLayout = ({
  schema,
  confirmField,
  serverValidationErrors,
}: BaseFormLayoutProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      ...(confirmField ? { confirmPassword: "" } : {}),
    },
  });

  const {
    watch,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = form;
  const isPasswordValid = !errors.password && watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (serverValidationErrors) {
      Object.entries(serverValidationErrors).forEach(([field, messages]) => {
        form.setError(field as keyof z.infer<typeof schema>, {
          type: "server",
          message: messages.join("\n"),
        });
      });
    }
  }, [serverValidationErrors]);
  return {
    form,
    showPassword,
    setShowPassword,
    isPasswordValid,
    showConfirmPassword,
    setShowConfirmPassword,
    isValid,
    isDirty,
    isSubmitting,
  };
};
