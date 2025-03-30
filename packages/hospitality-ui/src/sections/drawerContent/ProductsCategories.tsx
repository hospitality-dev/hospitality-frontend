// type Props = {
//   data?: { id?: string };
// };

import { useForm } from "@tanstack/react-form";
import { useResetAtom } from "jotai/utils";
import { string } from "zod";

import { drawerAtom } from "../../atoms";
import { Button, Form, Input } from "../../components";
import { useAuth, useCreate } from "../../hooks";
import { ProductsCategoriesInitializer, productsCategoriesInitializer } from "../../types";
import { formatErrorsForHelperText, getSentenceCase } from "../../utils";

export function ProductsCategories() {
  const auth = useAuth();
  const resetDrawer = useResetAtom(drawerAtom);
  const { mutate: create } = useCreate<ProductsCategoriesInitializer>("products_categories");
  const form = useForm({
    defaultValues: {
      title: "",
      isDefault: false,
      companyId: auth.user?.companyId,
    },
    onSubmit: (payload) =>
      create(payload, {
        onSuccess: resetDrawer,
      }),
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
                helperText={formatErrorsForHelperText(field.state.meta.errors)}
                isAutofocused
                label={getSentenceCase(field.name)}
                name={field.name}
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
