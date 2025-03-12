// type Props = {
//   data?: { id?: string };
// };

import { useForm } from "@tanstack/react-form";
import { useResetAtom } from "jotai/utils";
import { string } from "zod";

import { drawerAtom } from "../../atoms";
import { Button, Form, Input, Select } from "../../components";
import { useAuth, useCreate, useList } from "../../hooks";
import { ProductsCategories, ProductsInitializer, productsInitializer } from "../../types";
import { getSentenceCase } from "../../utils";

export function Product() {
  const auth = useAuth();
  const resetDrawer = useResetAtom(drawerAtom);
  const { mutate: create } = useCreate<ProductsInitializer>("products");

  const { data: categories } = useList<ProductsCategories>({
    model: "products_categories",
    fields: ["id", "title"],
  });

  const form = useForm({
    defaultValues: {
      title: "",
      companyId: auth.user?.companyId || "",
      barcode: null,
      categoryId: "",
    },
    onSubmit: (payload) =>
      create(payload, {
        onSuccess: resetDrawer,
      }),
    validators: {
      onChange: productsInitializer.extend({ title: string().nonempty("Title must be at least 1 character.") }),
      onSubmit: productsInitializer.extend({ title: string().nonempty("Title must be at least 1 character.") }),
    },
  });
  return (
    <>
      <Form handleSubmit={form.handleSubmit}>
        <div className="grid h-full grid-cols-2 content-start items-start gap-2">
          <form.Field
            children={(field) => (
              <Input
                helperText={field.state.meta.errors.join("\n ")}
                isAutofocused
                label={getSentenceCase(field.name)}
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
                variant={field.state.meta.errors.length ? "error" : "primary"}
              />
            )}
            name="title"
          />

          <form.Field
            children={(field) => (
              <Select
                label="Product category"
                onChange={(e) => field.handleChange(e.target.value as string)}
                options={(categories || [])?.map((cat) => ({ label: cat.title, value: cat.id }))}
                value={field.state.value}
                variant={field.state.meta.errors.length ? "error" : "primary"}
              />
            )}
            name="categoryId"
          />

          <form.Field
            children={(field) => (
              <div className="col-span-2">
                <Input
                  helperText={field.state.meta.errors.join("\n ")}
                  isAutofocused
                  label={getSentenceCase(field.name)}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={"number"}
                  value={field.state.value || ""}
                  variant={field.state.meta.errors.length ? "error" : "primary"}
                />
              </div>
            )}
            name="barcode"
          />
        </div>
        <div className="relative bottom-8">
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
