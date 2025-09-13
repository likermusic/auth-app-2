import { ForgotPasswordForm } from "@/features/auth";
import { FormPageLayout } from "@/shared/ui/layouts/FormPageLayout";
import React from "react";

export const ForgotPasswrod = () => {
  return (
    <FormPageLayout title="Forgot Password?" form={<ForgotPasswordForm />} />
  );
};
