import { useForm } from "@tanstack/react-form";

import { Button, Form, Input } from "../../components";
import { UsersInitializer, usersInitializer } from "../../types";
import { formatErrorsForHelperText } from "../../utils";

export function AddNewUser() {
  const form = useForm<UsersInitializer>({
    validators: {
      onSubmit: usersInitializer,
    },
  });

  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="grid h-full grid-cols-1 content-start gap-2 md:grid-cols-2">
        <form.Field
          children={(field) => (
            <Input
              helperText={formatErrorsForHelperText(field.state.meta.errors)}
              label="First name"
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              value={field.state.value}
            />
          )}
          name="firstName"
        />
        <form.Field
          children={(field) => (
            <Input
              helperText={formatErrorsForHelperText(field.state.meta.errors)}
              label="Last name"
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              value={field.state.value}
            />
          )}
          name="lastName"
        />
        <div className="md:col-span-2">
          <form.Field
            children={(field) => (
              <Input
                helperText={formatErrorsForHelperText(field.state.meta.errors) || "Must be at least 6 characters long"}
                label="Username"
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
              />
            )}
            name="username"
          />
        </div>
      </div>
      <div className="mt-auto">
        <form.Subscribe<[boolean, boolean]>
          children={(p) => {
            return <Button isDisabled={!p[0]} label="Create" onClick={undefined} variant="success" />;
          }}
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        />
      </div>
    </Form>
  );
}
