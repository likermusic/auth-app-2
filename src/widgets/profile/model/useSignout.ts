import { authApi } from "@/entities/user";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const useSignout = async () => {
  try {
    await authApi.signout();
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    // alert(error.response?.data.error);
    toast.error(error.response?.data.error);
  }
};
