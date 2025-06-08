import { FormLayout } from "./layouts/FormLayout";

export const SigninForm = () => {
  const signinHandler = (data: FormData) => {
    console.log("signinHandler");
  };

  return <FormLayout title="Sign in" onSubmit={signinHandler} />;
};
