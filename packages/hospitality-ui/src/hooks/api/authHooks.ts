import { useMutation, useQuery } from "@tanstack/react-query";
import { redirect, useLocation, useNavigate } from "@tanstack/react-router";
import { useAtom, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import ky from "ky";
import { useLayoutEffect } from "react";

import { userAtom } from "../../atoms";
import { loginResponseSchema } from "../../schemas";
import { LoginParams, LoginResponse, ResponseType } from "../../types";
import { authFetchFunction } from "../../utils";

export function useLogin() {
  const setUser = useSetAtom(userAtom);

  const params = useLocation();
  const navigate = useNavigate();
  const { mutate: login } = useMutation({
    mutationFn: async ({ value }: { value: LoginParams }) => {
      if (!params.search.code_challenge || !params.search.state) {
        return redirect({ to: "/" });
      }
      const res = await ky
        .get<ResponseType<LoginResponse>>("http://localhost:4000/auth/callback", {
          credentials: "include",
          retry: { limit: 0 },
          searchParams: new URLSearchParams([
            ["state", params.search.state],
            ["code", params.search.code_challenge],
            ["username", value.username],
            ["password", value.password],
          ]),
        })
        .json();
      if (res.ok === true && res.data.user.id) {
        const validation = loginResponseSchema.safeParse(res.data);
        if (validation.success) {
          localStorage.setItem("user_id", validation.data.user.id);
          setUser(validation.data);
          if (!validation.data.user?.locationId) {
            navigate({ to: "/location-select" });
          } else {
            navigate({ to: "/" });
          }
        } else console.error(validation);
      }
    },
  });
  return { login };
}

export function useAuth() {
  const userId = localStorage.getItem("user_id") || "";
  const [user, setUser] = useAtom(userAtom);
  const reset = useResetAtom(userAtom);
  const res = useQuery<LoginResponse>({
    queryKey: ["users", userId],
    queryFn: () => authFetchFunction<LoginResponse>({ method: "GET", userReset: reset, route: "session" }),
    staleTime: 5 * 60 * 1000,
  });

  useLayoutEffect(() => {
    if (!user && !!res?.data?.user) {
      const validation = loginResponseSchema.safeParse(res.data);
      if (validation.success) {
        setUser(validation.data);
      } else {
        console.error(validation);
      }
    }
  }, [user, res?.data]);

  return { user, reset };
}
