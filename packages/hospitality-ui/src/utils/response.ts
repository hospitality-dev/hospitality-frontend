import { redirect } from "@tanstack/react-router";
import { KyRequest, KyResponse, NormalizedOptions } from "ky";

// =========== HOOKS ===========
export async function handleUnauthenticated(
  _: KyRequest,
  __: NormalizedOptions,
  response: KyResponse,
  reset: () => void
): Promise<Response | void> {
  if (response.status === 401) {
    // TODO: HIT LOGOUT ROUTE
    localStorage.setItem("user_id", "");
    reset();
    redirect({ to: "/" });
  }

  // if (response.headers.get("Content-Type") === "application/json") {
  //   const res = await response.json<ResponseType<R>>();

  //   if (response.ok && res.ok) {

  //     return new Response((res), { status: 200 });
  //   }
  //   return new Response(JSON.stringify({ data: {}, ok: false, message: "There was an error with your request." }));
  // } else if (response.headers.get("Content-Type") === "text/plain") {
  //   const res = await response.text();
  //   if (response.ok) return new Response(res, { status: 200 });
  //   return new Response(JSON.stringify({ data: {}, ok: false, message: "There was an error with your request." }));
  // }
}
export function rejectOnUnauthorized() {}
