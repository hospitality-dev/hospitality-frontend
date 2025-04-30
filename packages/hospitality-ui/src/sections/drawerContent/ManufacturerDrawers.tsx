import { useForm, useStore } from "@tanstack/react-form";
import { object, string } from "zod";

import { Button, Form, Input } from "../../components";
import { useCloseDrawer, useCreate } from "../../hooks";
import { ContactSchema } from "../../types";
import { Contacts } from "../Contacts";

const validationSchema = object({
  title: string().nonempty("Manufacturer title is required."),
  contacts: ContactSchema.array(),
});

export function CreateManufacturer() {
  const closeDrawer = useCloseDrawer();
  const { mutate } = useCreate("manufacturers", { onSuccess: closeDrawer });
  const form = useForm({
    defaultValues: {
      title: "",
      contacts: [],
    },
    validators: {
      onSubmit: validationSchema,
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
              return <Button isDisabled={!p[0]} label="Create" onClick={undefined} variant="success" />;
            }}
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          />
        </div>
      </div>
    </Form>
  );
}
