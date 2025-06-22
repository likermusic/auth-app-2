import { SigninFormSchema } from "./formSchema";
import { authApi } from "@/entities/user/api/auth";
import type { AxiosError } from "axios";
import type { z } from "zod";

export const useSignin = () => {
  const signinHandler = async (data: z.infer<typeof SigninFormSchema>) => {
    console.log("signinHandler");
    // authApi
    //   .signup({ email: "admin@mail.ru", password: "1234" })
    //   .then((resp) => console.log(resp.data.message))
    //   .catch((error: AxiosError<{ error: string }>) => {
    //     console.log(error.response?.data.error);
    //   });
  };

  return { signinHandler };
};
