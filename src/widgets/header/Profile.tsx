import { useUserStore } from "@/entities/user/model/user.store";
import { Button } from "@/shared/ui/button";

export const Profile = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      <label>{user?.email}</label>
      <Button
        onClick={() => console.log("quit")}
        variant={"outline"}
        className="text-black cursor-pointer ml-3"
      >
        Выйти
      </Button>
    </div>
  );
};
