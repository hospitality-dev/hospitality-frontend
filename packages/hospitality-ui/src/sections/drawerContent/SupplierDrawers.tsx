import { useForm, useStore } from "@tanstack/react-form";

import { Button, Form, Input, Spinner } from "../../components";
import { Icons } from "../../enums";
import { useCloseDrawer, useCreate, useList, useRead, useUpdate } from "../../hooks";
import {
  ContactType,
  SuppliersInitalizerType,
  SuppliersInitializerSchema,
  SuppliersMutatorSchema,
  SuppliersMutatorType,
  SuppliersType,
} from "../../types";
import { Contacts } from "../Contacts";

export function CreateSupplier() {
  const closeDrawer = useCloseDrawer();
  const { mutate } = useCreate<SuppliersInitalizerType>("suppliers", { onSuccess: closeDrawer });
  const form = useForm({
    defaultValues: {
      title: "",
      contacts: [],
    },
    validators: {
      onSubmit: SuppliersInitializerSchema,
    },
    onSubmit: mutate,
  });
  const contacts = useStore(form.store, (state) => state.values.contacts);

  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="flex h-full flex-col gap-y-2">
        <form.Field
          children={(field) => (
            <Input
              errors={field.state.meta.errors}
              isAutofocused
              label="Title"
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              value={field.state.value}
            />
          )}
          name="title"
        />
        {/* @ts-expect-error limitaiton of tanstack form */}
        <Contacts contacts={contacts} form={form} isLoading={false} type="professional" />

        <div className="mt-auto">
          <form.Subscribe<[boolean, boolean]>
            children={(p) => {
              return <Button icon={Icons.add} isDisabled={!p[0]} label="Create" onClick={undefined} variant="success" />;
            }}
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          />
        </div>
      </div>
    </Form>
  );
}

export function UpdateSupplier({ data }: { data: { id: string } }) {
  const closeDrawer = useCloseDrawer();
  const { data: supplier, isSuccess } = useRead<SuppliersType>({ id: data.id, model: "suppliers", fields: ["id", "title"] });
  const { data: contactsList } = useList<ContactType>(
    { model: "contacts", fields: ["id", "title", "value", "prefix", "iso3", "isPrimary", "isPublic", "placeId"] },
    { urlSuffix: `supplier/${supplier?.id || data.id}`, enabled: !!supplier?.id }
  );
  const { mutate } = useUpdate<SuppliersMutatorType>("suppliers", { onSuccess: closeDrawer });
  const form = useForm({
    defaultValues: {
      id: supplier?.id || "",
      title: supplier?.title || "",
      contacts: contactsList || [],
    },
    validators: {
      onSubmit: SuppliersMutatorSchema,
    },
    onSubmit: mutate,
  });
  const contacts = useStore(form.store, (state) => state.values.contacts);

  if (!isSuccess) return <Spinner />;

  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="flex h-full flex-col gap-y-2">
        <form.Field
          children={(field) => (
            <Input
              errors={field.state.meta.errors}
              isAutofocused
              label="Title"
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              value={field.state.value}
            />
          )}
          name="title"
        />
        {/* @ts-expect-error limitaiton of tanstack form */}
        <Contacts contacts={contacts} form={form} isLoading={false} type="professional" />

        <div className="mt-auto">
          <form.Subscribe<[boolean, boolean]>
            children={(p) => {
              return <Button icon={Icons.save} isDisabled={!p[0]} label="Update" onClick={undefined} variant="success" />;
            }}
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          />
        </div>
      </div>
    </Form>
  );
}
