import { ResetPasswordForm } from "@/features/auth";
import { FormPageLayout } from "@/shared/ui/layouts/FormPageLayout";
import React from "react";
import { useCheckToken } from "../model/useCheckToken";
import { Spinner } from "@/shared/ui/spinner";

export const ResetPassword = () => {
  const { isToken } = useCheckToken();

  if (!isToken)
    return (
      <div className="min-h-screen flex justify-center">
        <Spinner />
      </div>
    );
  return <FormPageLayout title="Reset Password" form={<ResetPasswordForm />} />;
};
