import { useForm } from "@tanstack/react-form";
import { useResetAtom } from "jotai/utils";
import { string } from "zod";

import { drawerAtom, DrawerTypes } from "../../atoms";
import { Button, Form, Input, Numpad, Select } from "../../components";
import { Icons } from "../../enums";
import { useAuth, useBarcodeScanner, useCreate, useList, useScreenSize } from "../../hooks";
import { ProductsCategories, ProductsInitializer, productsInitializer } from "../../types";
import { getSentenceCase } from "../../utils";

export function Product({ data }: Pick<Extract<DrawerTypes, { type: "products" }>, "data">) {
  const auth = useAuth();
  const { isLg } = useScreenSize();
  const resetDrawer = useResetAtom(drawerAtom);
  const { setOnResult, closeBarcodeScanner } = useBarcodeScanner();
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
      categoryId: data.categoryId || "",
    },
    onSubmit: (payload) =>
      create(payload, {
        onSuccess: resetDrawer,
      }),
    validators: {
      onChange: productsInitializer.extend({
        title: string().nonempty("Title must be at least 1 character."),
        categoryId: string().uuid().nonempty("Must have a category selected."),
      }),
      onSubmit: productsInitializer.extend({
        title: string().nonempty("Title must be at least 1 character."),
        categoryId: string().uuid().nonempty("Must have a category selected."),
      }),
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
              <div className="col-span-2 flex flex-col gap-y-4">
                <Input
                  action={
                    !isLg
                      ? {
                          onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOnResult((result) => {
                              const barcode = result.getText();
                              field.handleChange(barcode);
                              closeBarcodeScanner();
                            });
                          },
                          icon: Icons.barcode,
                        }
                      : undefined
                  }
                  helperText={field.state.meta.errors.join("\n ")}
                  label={getSentenceCase(field.name)}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={"number"}
                  value={field.state.value || ""}
                  variant={field.state.meta.errors.length ? "error" : "primary"}
                />
                {!isLg ? (
                  <Numpad
                    onClick={(button) => {
                      if (button === "clear" || (button === "delete" && !field.state.value?.length)) field.handleChange("");
                      else if (button === "delete" && field.state.value?.length)
                        field.handleChange(field.state.value.slice(0, field.state.value.length - 1));
                      else field.handleChange(`${field.state.value}${button}`);
                    }}
                  />
                ) : null}
              </div>
            )}
            name="barcode"
          />
        </div>
        <div className={`relative ${isLg ? "bottom-8" : "bottom-24"}`}>
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
