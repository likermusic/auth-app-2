import React from "react";
import type { SigninFormData } from "../types";
import { authApi } from "@/entities/user";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/router/constants";

export const useSignin = () => {
  const navigate = useNavigate();

  const signinHandler = async (data: SigninFormData) => {
    try {
      await authApi.signin(data);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.log(error);
    }
  };
  return { signinHandler };
};
