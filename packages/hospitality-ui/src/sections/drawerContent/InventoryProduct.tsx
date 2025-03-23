import { useForm } from "@tanstack/react-form";
import { useResetAtom } from "jotai/utils";
import { number, string } from "zod";

import { drawerAtom, DrawerTypes } from "../../atoms";
import { Button, Form, Input, Select } from "../../components";
import { useAddInventoryProducts, useList, useRead, useScreenSize } from "../../hooks";
import { locationsProductsInitializer, Products } from "../../types";
import { formatForOptions } from "../../utils";

type Props = Pick<Extract<DrawerTypes, { type: "inventory_products" }>, "data">;

const formValidator = locationsProductsInitializer.extend({
  productId: string().uuid().nonempty("A product must be selected."),
  amount: number().gte(1, "Must be at least 1."),
  locationId: string().optional(),
});

export function InventoryProduct({ data }: Props) {
  const resetDrawer = useResetAtom(drawerAtom);
  const { isLg } = useScreenSize();
  const { data: product, isLoading: isLoadingProduct } = useRead<Products>(
    { id: `barcode/${data.barcode}`, model: "products", fields: ["id"] },
    { enabled: !!data.barcode }
  );
  const { data: products, isLoading } = useList<Products>(
    { model: "products", fields: ["id", "title"] },
    { enabled: (!!data.barcode && !!product) || !data.barcode, urlSuffix: `category/${data.categoryId}/active` }
  );

  const { mutate: addProducts } = useAddInventoryProducts();

  const form = useForm({
    defaultValues: {
      productId: product?.id || "",
      amount: 0,
    },
    onSubmit: (payload) =>
      addProducts(payload, {
        onSuccess: resetDrawer,
      }),
    validators: {
      onSubmit: formValidator,
    },
  });
  return (
    <>
      <Form handleSubmit={form.handleSubmit}>
        <div className="grid h-full grid-cols-1 content-start items-start gap-2">
          <form.Field
            children={(field) => (
              <div>
                <Select
                  isDisabled={isLoading || isLoadingProduct}
                  label="Product"
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  options={formatForOptions(products)}
                  value={field.state.value}
                  variant={field.state.meta.errors.length ? "error" : "primary"}
                />
              </div>
            )}
            name="productId"
          />

          <form.Field
            children={(field) => (
              <Input
                isDisabled={isLoading || isLoadingProduct}
                label="Amount"
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
