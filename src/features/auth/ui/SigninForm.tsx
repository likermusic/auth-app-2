import { ROUTES } from "@/shared/router/constants";
import { FormLayout } from "./layouts/FormLayout";
import { useSignin } from "../model/useSignin";
import { SigninFormSchema, type FormData, type SigninFormData } from "../types";

export const SigninForm = () => {
  const { signinHandler } = useSignin();

  return (
    <FormLayout
      buttonTitle="Sign in"
      onSubmit={signinHandler}
      link={{ to: ROUTES.SIGNUP, title: "Sign up" }}
      schema={SigninFormSchema}
    />
  );
};
