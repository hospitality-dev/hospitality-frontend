import { useMutation } from "@tanstack/react-query";
import { redirect, useLocation, useNavigate } from "@tanstack/react-router";
import { useAtom, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import ky from "ky";
import { useLayoutEffect } from "react";

import { userAtom } from "../../atoms";
import { loginResponseSchema } from "../../schemas";
import { LoginParams, LoginResponse, ResponseType } from "../../types";
import { User } from "../../types/models/entities";
import { useRead } from "./readHooks";

export function useLogin() {
  async function loginRoute() {
    const res = await ky
      .post<{ auth_url: string; state: string }>("http://localhost:4000/auth/login", {
        credentials: "include",
        // body: new URLSearchParams([
        //   ["username", value.username],
        //   ["password", value.password],
        // ]),
      })
      .json();

    localStorage.setItem("state", res.state);
    window.location.assign(res.auth_url);
  }
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
      if (res.ok === true && res.data.id) {
        const validation = loginResponseSchema.safeParse(res);
        if (validation.success) {
          localStorage.setItem("user_id", validation.data.data.id);
          setUser(validation.data.data);
          navigate({ to: "/" });
        } else console.error(validation);
      }
    },
  });
  return { loginRoute, login };
}

export function useAuth() {
  const userId = localStorage.getItem("user_id") || "";
  const userData = useRead<User>(
    {
      id: userId,
      model: "users",
      fields: ["id", "firstName", "lastName", "username"],
      relations: ["role"],
    },
    { enabled: !!userId }
  );
  const [user, setUser] = useAtom(userAtom);
  const reset = useResetAtom(userAtom);

  useLayoutEffect(() => {
    if (!user && !!userData.data) {
      setUser(userData.data.data);
    }
  }, [user, userData]);

  return { user, reset };
}
