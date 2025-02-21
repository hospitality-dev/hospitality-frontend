import { Button, Form, QueryClient, QueryClientProvider, useForm, useLogin } from "@hospitality/hospitality-ui";
import { createRootRoute, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { z } from "zod";
const queryClient = new QueryClient({});
const rootRoute = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
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
    useLogin();

    const { Field, handleSubmit, state } = useForm({
      defaultValues: {
        username: "",
        password: "",
      },
      validators: {
        onSubmit: z.object({
          username: z.string().nonempty("Username cannot be empty."),
          password: z.string().nonempty("Password cannot be empty."),
        }),
      },
      onSubmit: async () => {
        const response = await fetch("http://localhost:4000/auth/login?org_id=308087902967955458");

        const data = await response.json();

        // Store state in localStorage if you need to verify it later
        localStorage.setItem("auth_state", data.state);

        // Redirect to Zitadel's auth page
        window.location.href = data.auth_url;
      },
    });

    return (
      <div className="p-2">
        <Form handleSubmit={handleSubmit}>
          {state.errors.toString()}
          <Field
            children={(field) => (
              <input name={field.name} onChange={(e) => field.handleChange(e.target.value)} placeholder="Username" />
            )}
            name="username"
          />
          <Field
            children={(field) => (
              <input
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Password"
                type="password"
              />
            )}
            name="password"
          />

          <Button isOutline label="Log in" onClick={undefined} variant="success" />
        </Form>
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
