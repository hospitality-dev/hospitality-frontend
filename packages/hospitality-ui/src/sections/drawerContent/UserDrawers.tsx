import { useForm, useStore } from "@tanstack/react-form";

import { Button, Form, Input, Select } from "../../components";
import { useAuth, useCloseDrawer, useCreate, useList, useRole } from "../../hooks";
import {
  LocationsUsersInitalizerType,
  LocationsUsersInitializerSchema,
  LocationsUsersType,
  RolesType,
  UsersInitializerSchema,
  UsersInitializerType,
  UsersType,
} from "../../types";
import { formatForOptions, getUserInfo } from "../../utils";
import { Contacts } from "../Contacts";

export function AddNewUser() {
  const { roles } = useRole({ isOwnerHidden: true });
  const closeDrawer = useCloseDrawer();
  const { mutate: create } = useCreate<UsersInitializerType>("users", {
    onSuccess: closeDrawer,
    invalidateModels: ["locations_users"],
  });

  const form = useForm<UsersInitializerType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      password1: "",
      password2: "",
      contacts: [],
      username: "",
      roleId: "",
    },
    validators: {
      onSubmit: UsersInitializerSchema,
    },
    onSubmit: create,
  });
  const contacts = useStore(form.store, (state) => state.values.contacts);
  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="grid h-full grid-cols-1 content-start gap-2 md:grid-cols-2">
        <form.Field
          children={(field) => (
            <Input
              errors={field.state.meta.errors}
              label="First name"
              onChange={(e) => field.handleChange(e.target.value)}
              value={field.state.value}
            />
          )}
          name="firstName"
        />
        <form.Field
          children={(field) => (
            <Input
              errors={field.state.meta.errors}
              label="Last name"
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
                errors={field.state.meta.errors}
                helperText={"Must be at least 6 characters long"}
                label="Username"
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
                errors={field.state.meta.errors}
                helperText={"Must be at least 8 characters long."}
                label="Password"
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
                errors={field.state.meta.errors}
                helperText={"Must be at least 8 characters long."}
                label="Password confirm"
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
                errors={field.state.meta.errors}
                label="Role"
                onChange={(e) => {
                  if (e) field.handleChange(e.value);
                }}
                options={formatForOptions(roles)}
                value={field.state.value}
              />
            )}
            name="roleId"
          />
        </div>
        <div className="col-span-full mt-2 flex flex-col gap-y-4 overflow-y-auto">
          {/* @ts-expect-error tanstack form limitation */}
          <Contacts contacts={contacts} form={form} isLoading={false} type="personal" />
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
                errors={field.state.meta.errors}
                label="User"
                onChange={(e) => {
                  if (e) field.handleChange(e.value);
                }}
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
                errors={field.state.meta.errors}
                label="Role"
                onChange={(e) => {
                  if (e) field.handleChange(e.value);
                }}
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
