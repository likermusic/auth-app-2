import { authApi } from "@/entities/user/api/auth";
import { SigninForm } from "@/features/auth";

import { Button } from "@/shared/ui/button";
import { AxiosError } from "axios";

export const Signin = () => {
  // authApi
  //   .signin({ email: "admin@mail.ru", password: "1234" })
  //   .then((resp) => console.log(resp.data.message))
  //   .catch((error: AxiosError<{ error: string }>) => {
  //     console.log(error.response?.data.error);
  //   });
  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <main className="rounded-xl border border-zinc-500 bg-blue-200/10 px-14 py-8 pb-14 max-w-[400px]">
        <h1 className="text-4xl mb-6 text-white">Sign in</h1>
        <SigninForm />
      </main>
    </div>
  );
};
