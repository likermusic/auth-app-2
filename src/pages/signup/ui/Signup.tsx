import { SignupForm } from "@/features/auth";
import { FormPageLayout } from "@/shared/ui/layouts/FormPageLayout";
import React from "react";

export const Signup = () => {
  return <FormPageLayout title="Sign up" form={<SignupForm />} />;
};
