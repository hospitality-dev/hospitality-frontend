import { useForm } from "@tanstack/react-form";

import { Button, Form, Input, Select } from "../../components";
import { useAuth, useCloseDrawer, useCreate, useList } from "../../hooks";
import {
  LocationsUsersInitalizerType,
  LocationsUsersInitializerSchema,
  LocationsUsersType,
  RolesType,
  UsersInitializerSchema,
  UsersInitializerType,
  UsersType,
} from "../../types";
import { formatErrorsForHelperText, formatForOptions, getUserInfo } from "../../utils";

export function AddNewUser() {
  const { data: roles } = useList<RolesType>({ model: "roles", fields: ["id", "title", "isDefault", "companyId"] });
  const closeDrawer = useCloseDrawer();
  const { mutate: create } = useCreate<UsersInitializerType>("users", {
    onSuccess: closeDrawer,
    invalidateModels: ["locations_users"],
  });

  const form = useForm<UsersInitializerType>({
    validators: {
      onSubmit: UsersInitializerSchema,
    },
    onSubmit: create,
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

        <div className="col-span-1 md:col-span-2">
          <form.Field
            children={(field) => (
              <Input
                helperText={formatErrorsForHelperText(field.state.meta.errors) || "Must be at least 8 characters long."}
                label="Password"
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                type="password"
                value={field.state.value}
              />
            )}
            name="password1"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <form.Field
            children={(field) => (
              <Input
                helperText={formatErrorsForHelperText(field.state.meta.errors) || "Must be at least 8 characters long."}
                label="Password confirm"
                name={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                type="password"
                value={field.state.value}
              />
            )}
            name="password2"
          />
        </div>
        <div className="md:col-span-2">
          <form.Field
            children={(field) => (
              <Select
                // helperText={formatErrorsForHelperText(field.state.meta.errors) || "Must be at least 6 characters long"}
                label="Role"
                onChange={(e) => field.handleChange(e.target.value)}
                options={formatForOptions(roles)}
                value={field.state.value}
              />
            )}
            name="roleId"
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

export function AddUserFromLocation() {
  const auth = useAuth();
  const { data: locationsUsers } = useList<LocationsUsersType>(
    {
      model: "locations_users",
      fields: ["locationId", "userId", "roleId"],
      filters: { and: [{ field: "locationId", operator: "neq", value: auth.user?.locationId || "" }] },
    },
    {
      enabled: !!auth.user?.locationId,
    }
  );
  const { data: roles } = useList<RolesType>(
    { model: "roles", fields: ["id", "title", "isDefault", "companyId"] },
    {
      enabled: !!locationsUsers,
    }
  );
  const { data: users } = useList<UsersType>(
    {
      model: "users",
      fields: ["id", "firstName", "lastName", "username"],
      filters: { and: [{ field: "id", operator: "in", value: locationsUsers?.map((locUser) => locUser.userId) || [] }] },
    },
    {
      enabled: !!locationsUsers?.length,
      urlSuffix: `company/${auth.user?.companyId}`,
    }
  );
  const closeDrawer = useCloseDrawer();
  const { mutate: create } = useCreate<LocationsUsersInitalizerType>("locations_users", {
    onSuccess: closeDrawer,
    invalidateModels: ["users"],
  });

  const form = useForm<LocationsUsersInitalizerType>({
    validators: {
      onSubmit: LocationsUsersInitializerSchema,
    },
    onSubmit: create,
  });

  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="grid h-full grid-cols-1 content-start gap-2 md:grid-cols-2">
        <div className="md:col-span-2">
          <form.Field
            children={(field) => (
              <Select
                // helperText={formatErrorsForHelperText(field.state.meta.errors) || "Must be at least 6 characters long"}
                label="User"
                onChange={(e) => field.handleChange(e.target.value)}
                options={formatForOptions((users || []).map((user) => getUserInfo(user)))}
                value={field.state.value}
              />
            )}
            name="userId"
          />
        </div>
        <div className="md:col-span-2">
          <form.Field
            children={(field) => (
              <Select
                // helperText={formatErrorsForHelperText(field.state.meta.errors) || "Must be at least 6 characters long"}
                label="Role"
                onChange={(e) => field.handleChange(e.target.value)}
                options={formatForOptions(roles)}
                value={field.state.value}
              />
            )}
            name="roleId"
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
