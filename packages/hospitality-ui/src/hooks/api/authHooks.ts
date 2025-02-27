import { useMutation } from "@tanstack/react-query";
import { redirect, useLocation, useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import ky from "ky";
import { literal, object } from "zod";

import { userAtom } from "../../atoms";
import { LoginParams, LoginResponse, Response, users } from "../../types";

const loginResponseSchema = object({
  message: literal("Success."),
  ok: literal(true),
  data: users.pick({ id: true, firstName: true, lastName: true, username: true, phone: true, email: true }),
});
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
        .get<Response<LoginResponse>>("http://localhost:4000/auth/callback", {
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
          setUser(validation.data.data);
          navigate({ to: "/" });
        } else console.error(validation);
      }
    },
  });
  return { loginRoute, login };
}

export function useAuth() {}
