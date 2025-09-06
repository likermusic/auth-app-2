import { SigninForm, withCheckAuth } from "@/features/auth";
import { FormPageLayout } from "@/shared/ui/layouts/FormPageLayout";
import { useAuthFail } from "@/shared/lib/useAuthFail";

export const Signin = withCheckAuth(() => {
  useAuthFail();
  return <FormPageLayout title="Sign in" form={<SigninForm />} />;
});

// export const ProptectedSignin = withCheckAuth(SigninComp);
