import { redirect } from "@tanstack/react-router";
import { KyRequest, KyResponse, NormalizedOptions } from "ky";

import { ResponseType } from "../types";

// =========== HOOKS ===========
export async function formatDataResponseHook<R>(
  r: KyRequest,
  _: NormalizedOptions,
  response: KyResponse,
  reset: () => void
): Promise<Response | void> {
  if (response.status === 401) {
    // TODO: HIT LOGOUT ROUTE
    localStorage.setItem("user_id", "");
    reset();
    redirect({ to: "/" });
    return;
  }
  if (r.headers.get("Content-Type") === "application/json") {
    const res = await response.json<ResponseType<R>>();
    if (response.ok && res.ok) return new Response(JSON.stringify(res));
    return new Response(JSON.stringify({ data: {}, ok: false, message: "There was an error with your request." }));
  } else if (r.headers.get("Content-Type") === "text/plain") {
    const res = await response.text();
    if (response.ok) return new Response(res);
    return new Response(JSON.stringify({ data: {}, ok: false, message: "There was an error with your request." }));
  }
}
export function rejectOnUnauthorized() {}
