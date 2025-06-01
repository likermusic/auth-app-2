import { authApi } from "@/entities/user/api/auth";
import { SigninForm } from "@/features/auth";
import { Button } from "@/shared/ui/button";
import { AxiosError } from "axios";

export const Signin = () => {
  authApi
    .signin({ email: "admin@mail.ru", password: "1234" })
    .then((resp) => console.log(resp.data.message))
    .catch((error: AxiosError<{ error: string }>) => {
      console.log(error.response?.data.error);
    });
  return (
    <>
      <SigninForm />

      <span>&copy;all rightts res</span>
    </>
    // <Button size={"lg"} className="text-black-800 ">
    //   Button
    // </Button>
  );
};
