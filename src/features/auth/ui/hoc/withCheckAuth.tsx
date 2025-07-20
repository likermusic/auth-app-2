import { authApi } from "@/entities/user";
import { ROUTES } from "@/shared/router/constants";
import { Spinner } from "@/shared/ui/spinner";
import React, {
  useEffect,
  useState,
  type PropsWithChildren,
  type ReactElement,
} from "react";
import { useNavigate } from "react-router-dom";

export const withCheckAuth = <T,>(Component: (props: T) => ReactElement) => {
  return (props: PropsWithChildren<T>) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
      (async () => {
        try {
          await new Promise((res) => {
            setTimeout(() => res(), 2000);
          });
          const resp = await authApi.protected();
          navigate(ROUTES.HOME);
        } catch (error) {
          console.log("ERR");
        }
      })();
    }, []);

    if (loading)
      return (
        <div className="min-h-screen flex justify-center">
          <Spinner />
        </div>
      );
    return <Component {...props} />;
  };
};
