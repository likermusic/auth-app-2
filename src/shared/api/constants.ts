import { RouteNames } from "../types";

//TODO: Rename ROUTES to ENDPOINTS
export const ROUTES = {
  SIGNIN: RouteNames["Signin"],
  SIGNUP: RouteNames["Signup"],
  SIGNOUT: RouteNames["Signout"],
  PROTECTED: RouteNames["Protected"],
} as const;
