import { redirect } from "@tanstack/react-router";
import { KyRequest, KyResponse, NormalizedOptions } from "ky";

import { ResponseType } from "../types";

// =========== HOOKS ===========
export async function formatDataResponseHook<R>(
  _: KyRequest,
  __: NormalizedOptions,
  response: KyResponse,
  reset: () => void
): Promise<Response | void> {
  const res = await response.json<ResponseType<R>>();
  if (res.ok) return new Response(JSON.stringify(res));
  else {
    if (response.status === 401) {
      // TODO: HIT LOGOUT ROUTE
      localStorage.setItem("user_id", "");
      reset();
      redirect({ to: "/" });
    }
  }
}
export function rejectOnUnauthorized() {}
