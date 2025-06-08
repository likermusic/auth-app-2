import { FormLayout } from "./layouts/FormLayout";

export const SignupForm = () => {
  const signupHandler = (data: FormData) => {
    console.log("signupHandler");
  };

  return (
    <FormLayout title="Sign up" onSubmit={signupHandler} confirmField={true} />
  );
};
