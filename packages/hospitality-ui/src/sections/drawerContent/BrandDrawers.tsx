import { useForm } from "@tanstack/react-form";
import { object, string } from "zod";

import { Button, Form, Input, Select } from "../../components";
import { useCloseDrawer, useCreate, useList } from "../../hooks";
import { ManufacturersType } from "../../types/manufacturerTypes";
import { formatForOptions } from "../../utils";

const validationSchema = object({
  title: string().nonempty("Brand title is required."),
  parentId: string().uuid().nonempty("Manufacturer is required."),
});

export function CreateBrand({ data }: { data: { parentId: string } }) {
  const closeDrawer = useCloseDrawer();
  const { mutate } = useCreate("brands", { onSuccess: closeDrawer });
  const { data: manufacturers = [] } = useList<ManufacturersType>({
    model: "manufacturers",
    fields: ["id", "title"],
    sort: { field: "title", type: "asc" },
  });
  const form = useForm({
    defaultValues: {
      title: "",
      parentId: data.parentId,
    },
    validators: {
      onSubmit: validationSchema,
    },
    onSubmit: mutate,
  });

  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="flex h-full flex-col gap-y-2">
        <form.Field
          children={(field) => (
            <Select
              errors={field.state.meta.errors}
              label="Manufacturer"
              onBlur={field.handleBlur}
              onChange={(e) => {
                if (e?.value) field.handleChange(e?.value);
              }}
              options={formatForOptions(manufacturers)}
              value={field.state.value}
            />
          )}
          name="parentId"
        />
        <form.Field
          children={(field) => (
            <Input
              errors={field.state.meta.errors}
              label="Title"
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              value={field.state.value}
            />
          )}
          name="title"
        />

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
