import { authApi, useUserStore } from "@/entities/user";
import { ROUTES } from "@/shared/router/constants";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSignout = () => {
  const navigate = useNavigate();
  const signoutUser = useUserStore((state) => state.signoutUser);
  const user = useUserStore((state) => state.user);

  const signoutHandler = async () => {
    try {
      if (!user?.id) throw new Error("User is not defined");
      await authApi.signout({ id: user.id });
      signoutUser();
      navigate(ROUTES.SIGNIN);
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = err as AxiosError<{ error: string }>;
        toast.error(error.response?.data.error);
      } else {
        // const error = err as Error;
        // console.log(error.message);
        console.log((err as Error).message);
        toast.error("Uups. Some problems. Try again later");
      }
    }
  };
  return { signoutHandler };
};
