import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import type { SigninFormSchema, SignupFormSchema } from "./formSchema";
import { useEffect, useState } from "react";
import type { FormFieldsTypes } from "../types";

interface FormLayoutProps {
  confirmField?: boolean;
  schema: typeof SigninFormSchema | typeof SignupFormSchema;
  serverValidationErrors: FormFieldsTypes;
}

export const useFormLayout = ({
  schema,
  confirmField,
  serverValidationErrors,
}: FormLayoutProps) => {
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
    formState: { errors },
  } = form;
  const isPasswordValid = !errors.password && watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (serverValidationErrors) {
      // console.log(serverValidationErrors);

      Object.entries(serverValidationErrors).forEach(([field, messages]) => {
        form.setError(field as keyof z.infer<typeof schema>, {
          type: "server",
          message: messages.join("\n"),
        });
      });
    }
  }, [serverValidationErrors, form]);

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    isPasswordValid,
    form,
  };
};
