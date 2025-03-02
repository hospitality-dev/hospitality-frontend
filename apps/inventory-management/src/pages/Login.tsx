import { Button, Form, loginParamsSchema, useForm, useLogin } from "@hospitality/hospitality-ui";

export function Login() {
  const { login } = useLogin();

  const { Field, handleSubmit, state } = useForm({
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
}
