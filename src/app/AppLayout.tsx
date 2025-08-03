import { Header } from "@/widgets/header";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <h2>Footer</h2> */}
    </>
  );
};
