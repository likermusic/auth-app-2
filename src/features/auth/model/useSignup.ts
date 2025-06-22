import { authApi } from "@/entities/user/api/auth";
import type { AxiosError } from "axios";
import type { SignupFormSchema } from "./formSchema";
import type { z } from "zod";

export const useSignup = () => {
  const signupHandler = async (data: z.infer<typeof SignupFormSchema>) => {
    console.log("signupHandler");

    //   authApi
    // .signup({ email: "admin@mail.ru", password: "1234" })
    // .then((resp) => console.log(resp.data.message))
    // .catch((error: AxiosError<{ error: string }>) => {
    //   console.log(error.response?.data.error);
    // });
  };

  return { signupHandler };
};
