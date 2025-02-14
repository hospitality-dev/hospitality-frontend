import { Button } from "@hospitality/hospitality-ui";
import { createRootRoute, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  loader: () => {
    throw redirect({
      to: "/login",
    });
  },
  path: "/",
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: function About() {
    return (
      <div className="p-2">
        <Button label="Log in" variant="info" isOutline icon="ph:plus" />
        <Button label="Log in" variant="primary" isOutline icon="ph:folder" />
        <Button variant="secondary" isOutline />
        <Button label="Log in" variant="warning" isOutline />
        <Button label="Log in" variant="error" isOutline />
        <Button label="Log in" variant="success" isOutline />
      </div>
    );
  },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
