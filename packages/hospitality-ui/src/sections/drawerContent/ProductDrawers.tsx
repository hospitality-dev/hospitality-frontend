import { useForm, useStore } from "@tanstack/react-form";
import { useResetAtom } from "jotai/utils";
import { useEffect } from "react";
import { number, object, string } from "zod";

import { drawerAtom, DrawerTypes } from "../../atoms";
import { Button, Form, Input, Search, Select, Spinner } from "../../components";
import { Icons, Units } from "../../enums";
import {
  useAddInventoryProducts,
  useBarcodeScanner,
  useCreate,
  useList,
  useRead,
  useRemoveProducts,
  useScreenSize,
} from "../../hooks";
import { VolumeUnitsType, WeightUnitsType } from "../../types";
import { BrandsType } from "../../types/brandTypes";
import {
  ProductsCategoriesType,
  ProductsInitalizerSchema,
  ProductsInitalizerType,
  ProductsType,
} from "../../types/productTypes";
import { formatForOptions, getSentenceCase } from "../../utils";

// * For creating a product definition
export function CreateProduct({ data }: Pick<Extract<DrawerTypes, { type: "create_products" }>, "data">) {
  const { isLg } = useScreenSize();
  const resetDrawer = useResetAtom(drawerAtom);
  const { setOnResult, closeBarcodeScanner } = useBarcodeScanner();
  const { mutate: create } = useCreate<ProductsInitalizerType>("products", {
    invalidateModels: ["locations_available_products"],
  });
  const { data: categories } = useList<ProductsCategoriesType>({
    model: "products_categories",
    fields: ["id", "title"],
  });

  const form = useForm({
    defaultValues: {
      title: "",
      barcode: null,
      description: null,
      weight: null,
      weightUnit: null,
      volume: null,
      volumeUnit: null,
      subCategoryId: null,
      imageId: null,
      categoryId: data.categoryId || "",
      manufacturerId: null,
      brandId: null,
    },
    onSubmit: (payload) =>
      create(payload, {
        onSuccess: resetDrawer,
      }),
    validators: {
      onChange: ProductsInitalizerSchema,
      onSubmit: ProductsInitalizerSchema,
    },
  });

  const manufacturerId = useStore(form.store, (state) => state.values.manufacturerId);

  const { data: brands } = useList<BrandsType>(
    { model: "brands", fields: ["id", "title"], sort: { field: "title", type: "asc" } },
    { urlSuffix: manufacturerId || "", enabled: !!manufacturerId }
  );

  return (
    <>
      <Form handleSubmit={form.handleSubmit}>
        <div className="grid h-full grid-cols-1 content-start items-start gap-2 md:grid-cols-2">
          <form.Field
            children={(field) => (
              <div className="md:col-span-2">
                <Input
                  errors={field.state.meta.errors}
                  isAutofocused
                  label={getSentenceCase(field.name)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                />
              </div>
            )}
            name="title"
          />
          <form.Field
            children={(field) => (
              <div className="md:col-span-2">
                <Search
                  label="Manufacturer"
                  model="manufacturers"
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e?.value || null);
                  }}
                  value={field.state.value || ""}
                />
              </div>
            )}
            name="manufacturerId"
          />
          <form.Field
            children={(field) => (
              <div className="md:col-span-2">
                <Select
                  isClearable
                  label="Brand"
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e?.value || null);
                  }}
                  options={formatForOptions(brands)}
                  value={field.state.value}
                />
              </div>
            )}
            name="brandId"
          />
          <form.Field
            children={(field) => (
              <div className="md:col-span-2">
                <Select
                  label="Product category"
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    if (e) field.handleChange(e.value);
                  }}
                  options={formatForOptions(categories)}
                  value={field.state.value}
                />
              </div>
            )}
            name="categoryId"
          />
          <form.Subscribe<{ weightUnit: WeightUnitsType | null; volumeUnit: VolumeUnitsType | null }>
            children={(state) => (
              <div className="flex flex-col gap-y-2 md:col-span-2">
                <form.Field
                  children={(field) => (
                    <Input
                      errors={field.state.meta.errors}
                      inputMode="decimal"
                      label={getSentenceCase(field.name)}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      onSelectChange={(item) => form.setFieldValue("weightUnit", (item?.value as WeightUnitsType) || null)}
                      options={Units.weight}
                      selectValue={state.weightUnit}
                      step=".01"
                      type="number"
                      value={field.state.value?.toString() || ""}
                    />
                  )}
                  name="weight"
                />
                <form.Field
                  children={(field) => (
                    <Input
                      errors={field.state.meta.errors}
                      inputMode="decimal"
                      label={getSentenceCase(field.name)}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      onSelectChange={(item) => form.setFieldValue("volumeUnit", (item?.value as VolumeUnitsType) || null)}
                      options={Units.volume}
                      selectValue={state.volumeUnit}
                      step=".01"
                      type="number"
                      value={field.state.value?.toString() || ""}
                    />
                  )}
                  name="volume"
                />
              </div>
            )}
            selector={(state) => ({ weightUnit: state.values.weightUnit, volumeUnit: state.values.volumeUnit })}
          />

          <form.Field
            children={(field) => (
              <div className="flex flex-col gap-y-4 md:col-span-2">
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
                  errors={field.state.meta.errors}
                  inputMode="numeric"
                  label={getSentenceCase(field.name)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="number"
                  value={field.state.value || ""}
                />
              </div>
            )}
            name="barcode"
          />
        </div>
        <div className="mt-auto md:col-span-2">
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

// * For adding or removing a product to/from a location's inventory
export function ManageProductInventory({ data }: Pick<Extract<DrawerTypes, { type: "manage_product_inventory" }>, "data">) {
  const resetDrawer = useResetAtom(drawerAtom);
  const { data: product, isLoading: isLoadingProduct } = useRead<ProductsType>(
    { id: `${data.barcode ? "barcode/" : ""}${data.barcode || data.id}`, model: "products", fields: ["id", "title"] },
    { enabled: !!(data.barcode || data.id) }
  );
  const { data: products, isLoading } = useList<ProductsType>(
    { model: "products", fields: ["id", "title", "brandTitle", "manufacturerTitle"] },
    { enabled: !data.barcode && !data.id, urlSuffix: `category/${data.categoryId}/active` }
  );

  const { mutate: addProducts } = useAddInventoryProducts();
  const { mutate: removeProducts } = useRemoveProducts();

  const form = useForm({
    defaultValues: {
      id: data.id || "",
      amount: 0,
      expirationDate: null,
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
              expirationDate: string().nullish(),
            })
          : object({
              id: string().uuid(),
              amount: number().min(1).max(data.maxAmount, "Cannot remove more than available items."),
              expirationDate: string().nullish(),
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
                    errors={field.state.meta.errors}
                    isDisabled
                    label="Product"
                    onBlur={field.handleBlur}
                    onChange={() => {}}
                    value={product?.title}
                    variant="secondary"
                  />
                ) : (
                  <Select
                    isDisabled={isLoading || isLoadingProduct}
                    label="Product"
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      if (e?.value) field.handleChange(e?.value);
                    }}
                    options={formatForOptions(products)}
                    value={field.state.value as string}
                  />
                )}
                {field.state.meta.errors.toString()}
              </div>
            )}
            name="id"
          />
          <div className="flex items-center gap-2 md:flex-col">
            <form.Field
              children={(field) => (
                <Input
                  errors={field.state.meta.errors}
                  inputMode="numeric"
                  isDisabled={isLoading || isLoadingProduct}
                  label="Amount"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  value={field.state.value}
                />
              )}
              name="amount"
            />
            <form.Field
              children={(field) => (
                <Input
                  errors={field.state.meta.errors}
                  isDisabled={isLoading || isLoadingProduct}
                  label="Expiration date (optional)"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="date"
                  value={field.state.value || ""}
                />
              )}
              name="expirationDate"
            />
          </div>
        </div>
        <div className="mt-auto md:col-span-2">
          <form.Subscribe<[boolean, boolean]>
            children={(p) => {
              return (
                <Button
                  icon={data.type === "add_products" ? Icons.addItem : Icons.removeItem}
                  isDisabled={!p[0] || isLoading || isLoadingProduct}
                  label={data.type === "add_products" ? "Add" : "Remove"}
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
