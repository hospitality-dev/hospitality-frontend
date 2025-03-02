/* eslint-disable camelcase */
import { AuthContextType, useAuth } from "@hospitality/hospitality-ui";
import { createRootRouteWithContext, createRoute, createRouter, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { Login } from "./pages";
import { AppLayout } from "./pages/Layout";

const rootRoute = createRootRouteWithContext<AuthContextType>()({
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  loader: () => {
    fetch("http://localhost:4000/api/v1/users", { credentials: "include" });
    // throw redirect({
    //   search: { code_challenge: "", code_challenge_method: "S256", state: "", redirect_uri: "" },
    //   to: "/login",
    // });
  },
  path: "/",
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  beforeLoad: (params) => {
    console.log(params);
  },
  path: "/login",
  validateSearch: z.object({
    code_challenge: z.string(),
    code_challenge_method: z.literal("S256"),
    redirect_uri: z.string().url(),
    state: z.string().uuid(),
  }),
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    if (!deps?.code_challenge || !deps?.code_challenge_method || !deps?.redirect_uri || !deps?.state) {
      throw redirect({ to: "/" });
    }
  },
  component: Login,
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);

export const router = createRouter({
  routeTree,
  context: {
    user: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
