/* eslint-disable camelcase */
import {
  Button,
  Form,
  Navbar,
  QueryClient,
  QueryClientProvider,
  Sidebar,
  useForm,
  useLogin,
} from "@hospitality/hospitality-ui";
import { createRootRoute, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { z } from "zod";
const queryClient = new QueryClient({});
const rootRoute = createRootRoute({
  component: () => (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex h-screen w-screen flex-nowrap">
          <Sidebar />
          <div className="flex w-full flex-col">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </>
  ),
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
  component: function About() {
    const { login } = useLogin();

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
      onSubmit: login,
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
        <br />
        <Button label="Create organization" onClick={undefined} variant="info" />
      </div>
    );
  },
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
