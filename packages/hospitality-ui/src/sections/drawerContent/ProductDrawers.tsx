import { useForm } from "@tanstack/react-form";
import { useResetAtom } from "jotai/utils";
import { useEffect } from "react";
import { number, object, string } from "zod";

import { drawerAtom, DrawerTypes } from "../../atoms";
import { Button, Form, Input, Numpad, Select, Spinner } from "../../components";
import { Icons } from "../../enums";
import {
  useAddInventoryProducts,
  useAuth,
  useBarcodeScanner,
  useCreate,
  useList,
  useRead,
  useRemoveProducts,
  useScreenSize,
} from "../../hooks";
import { Products, ProductsCategories, ProductsInitializer, productsInitializer } from "../../types";
import { formatErrorsForHelperText, formatForOptions, getSentenceCase } from "../../utils";

// * For creating a product definition
export function CreateProduct({ data }: Pick<Extract<DrawerTypes, { type: "create_products" }>, "data">) {
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
                helperText={formatErrorsForHelperText(field.state.meta.errors)}
                isAutofocused
                label={getSentenceCase(field.name)}
                name={field.name}
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
                  helperText={formatErrorsForHelperText(field.state.meta.errors)}
                  label={getSentenceCase(field.name)}
                  name={field.name}
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

// * For adding a product from a location's inventory
export function ManageProductInventory({ data }: Pick<Extract<DrawerTypes, { type: "manage_product_inventory" }>, "data">) {
  const resetDrawer = useResetAtom(drawerAtom);
  const { isLg } = useScreenSize();
  const { data: product, isLoading: isLoadingProduct } = useRead<Products>(
    { id: `${data.barcode ? "barcode/" : ""}${data.barcode || data.id}`, model: "products", fields: ["id", "title"] },
    { enabled: !!(data.barcode || data.id) }
  );
  const { data: products, isLoading } = useList<Products>(
    { model: "products", fields: ["id", "title"] },
    { enabled: !data.barcode && !data.id, urlSuffix: `category/${data.categoryId}/active` }
  );

  const { mutate: addProducts } = useAddInventoryProducts();
  const { mutate: removeProducts } = useRemoveProducts();

  const form = useForm({
    defaultValues: {
      id: data.id || "",
      amount: 0,
    },
    onSubmit: (payload) =>
      data.type === "add_products"
        ? addProducts(payload, {
            onSuccess: resetDrawer,
          })
        : removeProducts(payload, {
            onSuccess: resetDrawer,
          }),
    validators: {
      onSubmit:
        data.type === "add_products"
          ? object({
              amount: number().min(1).max(100, "Cannot add more than 100 items."),
              id: string().uuid(),
            })
          : object({
              id: string().uuid(),
              amount: number().min(1).max(data.maxAmount, "Cannot remove more than available items."),
            }),
    },
  });

  useEffect(() => {
    if (product) {
      form.setFieldValue("id", product.id);
    }
  }, [product]);

  if (isLoadingProduct) return <Spinner />;
  return (
    <>
      <Form handleSubmit={form.handleSubmit}>
        <div className="grid h-full grid-cols-1 content-start items-start gap-2">
          <form.Field
            children={(field) => (
              <div>
                {data.id || data.barcode ? (
                  <Input
                    helperText={formatErrorsForHelperText(field.state.meta.errors)}
                    isDisabled
                    label="Product"
                    name={field.name}
                    onChange={() => {}}
                    value={product?.title}
                    variant="secondary"
                  />
                ) : (
                  <Select
                    isDisabled={isLoading || isLoadingProduct}
                    label="Product"
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    options={formatForOptions(products)}
                    value={field.state.value as string}
                    variant={field.state.meta.errors.length ? "error" : "primary"}
                  />
                )}
                {field.state.meta.errors.toString()}
              </div>
            )}
            name="id"
          />

          <form.Field
            children={(field) => (
              <Input
                helperText={formatErrorsForHelperText(field.state.meta.errors)}
                isDisabled={isLoading || isLoadingProduct}
                label="Amount"
                name={field.name}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                value={field.state.value}
                variant={field.state.meta.errors.length ? "error" : "primary"}
              />
            )}
            name="amount"
          />
        </div>
        <div className={`relative ${isLg ? "bottom-8" : "bottom-24"}`}>
          <form.Subscribe<[boolean, boolean]>
            children={(p) => {
              return (
                <Button
                  isDisabled={!p[0] || isLoading || isLoadingProduct}
                  label="Create"
                  onClick={undefined}
                  variant="success"
                />
              );
            }}
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          />
        </div>
      </Form>
    </>
  );
}
