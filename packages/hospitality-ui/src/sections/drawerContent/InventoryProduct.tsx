import { useForm } from "@tanstack/react-form";
import { useResetAtom } from "jotai/utils";
import { number, string } from "zod";

import { drawerAtom, DrawerTypes } from "../../atoms";
import { Form, Input, Select } from "../../components";
import { useAddInventoryProducts, useList } from "../../hooks";
import { locationsProductsInitializer, Products } from "../../types";
import { formatForOptions } from "../../utils";

type Props = Pick<Extract<DrawerTypes, { type: "inventory_products" }>, "data">;

const formValidator = locationsProductsInitializer.extend({
  productId: string().uuid().nonempty("A product must be selected."),
  amount: number().gte(1, "Must be at least 1."),
  locationId: string().optional(),
});

export function InventoryProduct({ data }: Props) {
  const { mutate: addProducts } = useAddInventoryProducts();
  const resetDrawer = useResetAtom(drawerAtom);
  const { data: products, isLoading } = useList<Products>(
    { model: "products", fields: ["id", "title"] },
    { urlSuffix: `category/${data.categoryId}/active` }
  );
  const form = useForm({
    defaultValues: {
      productId: "",
      amount: 0,
    },
    onSubmit: (payload) =>
      addProducts(payload, {
        onSuccess: resetDrawer,
      }),
    validators: {
      onChange: formValidator,
      onSubmit: formValidator,
    },
  });

  return (
    <>
      <Form handleSubmit={form.handleSubmit}>
        <div className="grid h-full grid-cols-2 content-start items-start gap-2">
          <form.Field
            children={(field) => (
              <Select
                isDisabled={isLoading}
                label="Product"
                onChange={(e) => field.handleChange(e.target.value)}
                options={formatForOptions(products)}
                value={field.state.value}
                variant={field.state.meta.errors.length ? "error" : "primary"}
              />
            )}
            name="productId"
          />
          <form.Field
            children={(field) => (
              <Input
                isDisabled={isLoading}
                label="Amount"
                onChange={(e) => field.handleChange(Number(e.target.value))}
                value={field.state.value}
                variant={field.state.meta.errors.length ? "error" : "primary"}
              />
            )}
            name="amount"
          />
        </div>
      </Form>
    </>
  );
}
