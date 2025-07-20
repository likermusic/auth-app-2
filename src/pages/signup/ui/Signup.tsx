import { authApi } from "@/entities/user/api/auth";
import { SignupForm, withCheckAuth } from "@/features/auth";
import { FormPageLayout } from "@/shared/ui/layouts/FormPageLayout";
import React from "react";

export const Signup = withCheckAuth(() => {
  return <FormPageLayout title="Sign up" form={<SignupForm />} />;
});
