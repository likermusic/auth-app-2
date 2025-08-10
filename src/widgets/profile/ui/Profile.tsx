import { authApi } from "@/entities/user";
import { useUserStore } from "@/entities/user/model/user.store";
import { Button } from "@/shared/ui/button";
import { useSignout } from "../model/useSignout";
import { Toaster } from "sonner";

export const Profile = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div>
      <Toaster />
      <label>{user?.email}</label>
      <Button
        onClick={useSignout}
        variant={"outline"}
        className="text-black cursor-pointer ml-3"
      >
        Выйти
      </Button>
    </div>
  );
};
