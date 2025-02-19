import { Button, Icons } from "@hospitality/hospitality-ui";
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
        <Button icon={Icons.add} isOutline label="Log in" onClick={undefined} variant="info" />
        <Button isOutline label="Log in" onClick={undefined} variant="primary" />
        <Button isOutline onClick={undefined} variant="secondary" />
        <Button isOutline label="Log in" onClick={undefined} variant="warning" />
        <Button isOutline label="Log in" onClick={undefined} variant="error" />
        <Button isOutline label="Log in" onClick={undefined} variant="success" />
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
