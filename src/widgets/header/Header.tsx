import { ROUTES } from "@/shared/router/constants";
import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "./Profile";

export const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center bg-gray-800 text-white">
      <Link to={ROUTES.HOME}>Logo</Link>
      <Profile />
    </header>
  );
};
