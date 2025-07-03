import { AxiosError } from "axios";
import type { SignupFormSchema } from "./formSchema";
import type { z } from "zod";
import { authApi } from "@/entities/user";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/router/constants";
import { toast } from "sonner";
import * as Cookies from "js-cookie";

export const useSignup = () => {
  const navigate = useNavigate();

  const signupHandler = async (data: z.infer<typeof SignupFormSchema>) => {
    try {
      // throw new Error();
      const resp = await authApi.signup(data);

      if (!resp.data.token) throw new Error("Token not found");
      Cookies.default.set("token", resp.data.token, {
        expires: 1 / 24,
      });
      // navigate(ROUTES.HOME);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      // const errorsArray = Object.entries(error.response?.data.error);
      // console.log(res);
      // const errorMes = errorsArray.map(
      //   (err) =>
      //     `<b>${err[0]}: </b> ${err[1].map((innerErr) => `<span>${innerErr}</span><br>`)} <br>`,
      // );

      // const errorMes = errorsArray.map(
      //   (err) =>
      //     `${err[0]}: ${err[1].map((innerErr) => `${innerErr} \n`)} \n`,
      // );
      // console.log(errorMes);

      const errorMessage = errorsArray
        .map(([field, messages]) => {
          // messages может быть массивом или строкой
          const msgText = Array.isArray(messages)
            ? messages.join(", ")
            : messages;
          return `${field}: ${msgText}`;
        })
        .join(" | "); // Можно выбрать любой разделитель

      toast.error(errorMessage);
    }
  };
  return { signupHandler };
};
