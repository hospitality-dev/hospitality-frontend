import { useForm } from "@tanstack/react-form";
import { useResetAtom } from "jotai/utils";

import { drawerAtom } from "../../atoms";
import { Button, Form, Input } from "../../components";
import { useCreate } from "../../hooks";
import { ProductsCategoriesInitalizerSchema, ProductsCategoriesInitalizerType } from "../../types/productTypes";
import { getSentenceCase } from "../../utils";

export function ProductsCategoriesDrawer() {
  const resetDrawer = useResetAtom(drawerAtom);
  const { mutate: create } = useCreate<ProductsCategoriesInitalizerType>("products_categories");
  const form = useForm({
    defaultValues: {
      title: "",
      parentId: null,
    },
    onSubmit: (payload) =>
      create(payload, {
        onSuccess: resetDrawer,
      }),
    validators: {
      onChange: ProductsCategoriesInitalizerSchema,
      onSubmit: ProductsCategoriesInitalizerSchema,
    },
  });
  return (
    <>
      <Form handleSubmit={form.handleSubmit}>
        <div className="flex h-full flex-col gap-y-2">
          <form.Field
            children={(field) => (
              <Input
                errors={field.state.meta.errors}
                isAutofocused
                label={getSentenceCase(field.name)}
                onChange={(e) => field.handleChange(e.target.value as string)}
                value={field.state.value}
                variant={field.state.meta.errors.length ? "error" : "primary"}
              />
            )}
            name="title"
          />
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
    </>
  );
}
