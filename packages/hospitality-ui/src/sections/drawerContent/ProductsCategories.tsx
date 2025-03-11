// type Props = {
//   data?: { id?: string };
// };

import { useForm } from "@tanstack/react-form";
import { string } from "zod";

import { Button, Form, Input } from "../../components";
import { useAuth, useCreate } from "../../hooks";
import { ProductsCategoriesInitializer, productsCategoriesInitializer } from "../../types";
import { getSentenceCase } from "../../utils";

export function ProductsCategories() {
  const auth = useAuth();
  const { mutate: create } = useCreate<ProductsCategoriesInitializer>("products_categories");
  const form = useForm({
    defaultValues: {
      title: "",
      isDefault: false,
      locationId: auth.user?.locationId,
    },
    onSubmit: create,
    validators: {
      onChange: productsCategoriesInitializer.extend({ title: string().nonempty("Title must be at least 1 character.") }),
      onSubmit: productsCategoriesInitializer.extend({ title: string().nonempty("Title must be at least 1 character.") }),
    },
  });
  return (
    <>
      <Form handleSubmit={form.handleSubmit}>
        <div className="flex h-full flex-col gap-y-2">
          <form.Field
            children={(field) => (
              <Input
                helperText={field.state.meta.errors.join("\n ")}
                isAutofocused
                label={getSentenceCase(field.name)}
                onChange={(e) => field.handleChange(e.target.value as string)}
                value={field.state.value}
                variant={field.state.meta.errors.length ? "error" : "primary"}
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
    </>
  );
}
