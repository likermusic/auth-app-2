import { RouteNames } from "../types";

//TODO: Rename ROUTES to ENDPOINTS
export const ROUTES = {
  SIGNIN: RouteNames["Signin"],
  SIGNUP: RouteNames["Signup"],
  SIGNOUT: RouteNames["Signout"],
  PROTECTED: RouteNames["Protected"],
  AUTH_GOOGLE: RouteNames["AuthGoogle"],
  FORGOT_PASSWORD: RouteNames["ForgotPassword"],
  RESET_PASSWORD: RouteNames["ResetPassword"],
} as const;
