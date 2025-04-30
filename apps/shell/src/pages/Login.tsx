import { Button, Form, Input, loginParamsSchema, useForm, useLogin } from "@hospitality/hospitality-ui";

export function Login() {
  const { login } = useLogin();

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
      onSubmit: loginParamsSchema,
    },
    onSubmit: login,
  });
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-1/2 items-center justify-center">
        <div className="flex w-lg flex-col gap-6 p-2 max-lg:w-80 max-lg:gap-3 max-md:w-70">
          <h3 className="text-center text-2xl">Welcome!</h3>
          <p>
            Don't have an account? <strong className="cursor-pointer underline">Sign up!</strong>
          </p>
          <Form handleSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <Field
                children={(field) => (
                  <Input
                    errors={field.state.meta.errors}
                    label="Username"
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Username"
                    size="lg"
                    value={field.state.value || ""}
                  />
                )}
                name="username"
              />
              <Field
                children={(field) => (
                  <Input
                    errors={field.state.meta.errors}
                    label="Password"
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Password"
                    size="lg"
                    type="password"
                    value={field.state.value || ""}
                  />
                )}
                name="password"
              />

              <p className="cursor-pointer underline">Forgot password?</p>
              <Button label="Log in" onClick={undefined} size="lg" variant="success" />
            </div>
          </Form>
        </div>
      </div>
      <div className="h-screen w-1/2 max-lg:hidden">
        <img
          className="background h-full w-full"
          src="https://images.unsplash.com/photo-1555992336-fb0d29498b13?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>
  );
}
