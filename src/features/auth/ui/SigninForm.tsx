import { ROUTES } from "@/shared/router/constants";
import { FormLayout } from "./layouts/FormLayout";

export const SigninForm = () => {
  const signinHandler = (data: FormData) => {
    console.log("signinHandler");
  };

  return (
    <FormLayout
      buttonTitle="Sign in"
      onSubmit={signinHandler}
      link={{ to: ROUTES.SIGNUP, title: "Sign up" }}
    />
  );
};
