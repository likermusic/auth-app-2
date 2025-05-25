import { api } from "@/shared/api/axios-instance";
import { Button } from "@/shared/ui/button";

export function App() {
  api.get("/").then((resp) => console.log(resp));
  return (
    <Button size={"lg"} className="text-black-800 ">
      BButton
    </Button>
  );
}
