import { authApi } from "@/entities/user/api/auth";
import { Button } from "@/shared/ui/button";
import { AxiosError } from "axios";

export function App() {
  // api.get("/").then((resp) => console.log(resp));
  authApi
    .signin({ email: "admin@mail.ru", password: "1234" })
    .then((resp) => console.log(resp.data.message))
    .catch((error: AxiosError<{ error: string }>) => {
      console.log(error.response?.data.error);
    });
  return (
    <Button size={"lg"} className="text-black-800 ">
      Button
    </Button>
  );
}
