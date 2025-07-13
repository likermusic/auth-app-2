import { ROUTES } from "@/shared/router/constants";
import { FormLayout } from "./layouts/FormLayout";
import { SigninFormSchema } from "../model/formSchema";
import { useSignin } from "../model/useSignin";
import { ROUTES as ROUTES_VALUES } from "@/shared/api/constants";

import { useAuth } from "../model/useAuth";
// import { useSignin } from "../model/useSignin";

export const SigninForm = () => {
  // const { signinHandler, serverValidationErrors } = useSignin();

  const { authHandler, serverValidationErrors } = useAuth(ROUTES_VALUES.SIGNIN);
  return (
    <FormLayout
      buttonTitle="Sign in"
      onSubmit={authHandler}
      link={{ to: ROUTES.SIGNUP, title: "Sign up" }}
      schema={SigninFormSchema}
      serverValidationErrors={serverValidationErrors}
    />
  );
};
