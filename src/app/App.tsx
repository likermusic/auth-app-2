import { authApi } from "@/entities/user/api/auth";
import { Button } from "@/shared/ui/button";

export function App() {
  // api.get("/").then((resp) => console.log(resp));
  authApi
    .signin({ email: "test@test.ru", password: "1234" })
    .then((resp) => console.log(resp.data));
  return (
    <Button size={"lg"} className="text-black-800 ">
      BButton
    </Button>
  );
}
