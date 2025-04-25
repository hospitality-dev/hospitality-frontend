import { ReactFormExtendedApi, useForm } from "@tanstack/react-form";
import { CellContext, createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { DrawerTypes } from "../../atoms";
import { Button, Form, Input, Table, Title } from "../../components";
import { Icons } from "../../enums";
import { useCreate, useDrawer, useList, useTable } from "../../hooks";
import { ProductsType, PurchaseItemsType, PurhcaseItemsModifySchema } from "../../types";
import { formatProductUnits, formatStringToISO } from "../../utils";

type ModifyPurchaseItem = Pick<PurchaseItemsType, "id" | "title" | "productId" | "quantity"> &
  Pick<ProductsType, "weight" | "weightUnit" | "volume" | "volumeUnit"> & { expirationDate: string };

type FormType = ReactFormExtendedApi<
  {
    products?:
      | {
          productId: string;
          quantity: number;
          unitOfMeasurement?: string | undefined;
          expirationDate?: string | undefined;
        }[]
      | undefined;
  },
  undefined
>;

const modifyPurchaseColHelper = createColumnHelper<ModifyPurchaseItem>();

function ModifyPurchaseExpirationDateCol(info: CellContext<ModifyPurchaseItem, string>, form: FormType) {
  const initialValue = info.getValue();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      inputMode="numeric"
      isDisabled={!info.row.original.productId}
      name="expirationDate"
      onChange={(e) => {
        setValue(e.target.value);
        form.setFieldValue(`products[${info.row.index}].expirationDate`, e.target.value);
      }}
      type="date"
      value={value}
    />
  );
}

function columns(form: FormType) {
  return [
    modifyPurchaseColHelper.accessor("title", {
      header: "Title",
      cell: (info) => <div className="truncate">{info.getValue()}</div>,
    }),
    modifyPurchaseColHelper.accessor("quantity", {
      header: "Amount",
      cell: (info) => {
        return `${info.getValue()} ${formatProductUnits(info.row.original)}`.toLowerCase();
      },
      size: 80,
    }),
    modifyPurchaseColHelper.accessor("expirationDate", {
      header: "Expiration date",
      cell: (info) => ModifyPurchaseExpirationDateCol(info, form),
    }),
  ];
}

const lidlUrl =
  "https://suf.purs.gov.rs/v/?vl=A1U4R0dDQ0pHVThHR0NDSkfnkAAAq4wAAGiOuwcAAAAAAAABlmH7BVcAAACt6uZjqD9Njx7hfTpHj7ivr1yWvTpKHPVsUiZa53n9N3gcVmTVOlj8bWLJaT9G%2B7mZ7EBIoi30bz60yfv3uCTgZUxBo6y4vNTHGhRLBH4jOvu2cFxZskCBkf10vNRK%2FbLTycZ5WC0PUMpYoEAERkle86Ag6Ml1U4a7YyNysO%2Fepd8WYW%2FIvCXHzUQYySQhyYNih8C%2BmBvroH1gG9PMkGH7sH15%2FAt%2Bpi0ZEm5Dusqr9ExvTWcPP1ynp3UC3WzW1efBUS7qhveHMXR%2FDJKTPPgnMUfb0IGDXnPr8U%2BhBl6XuEzHw06dfZNDQY6JLp6C0Q9p0GLTScIiwatPfrj4RrA2jVkbIGmdeDGw12UOE1RpkUVYqtgKvVm3RuEVuG1VyRjjV7mtXiGZFWRL8e0DfBDeb%2Fak31AG9FvVfjHoDmMeZJoCWKwE3Emb4oYFJOib0UUOmsoZrK3ouD0df5fOQaZLWcs0eqCBQRjeWnOKi0VbCZqz3BKfBqmnkg2y%2B1QIv4BxG0fO3Q86diXt5U7OQnF0EMR0IzkZHGCIZ1l%2Bfer4A%2FCMK8leVG1YKBVs4h%2Bt%2FAATLTmWxtGZ3W7MEBnAF8PusXmpOM8k%2F%2FhS6EHjKXycrAEwrtprDSre6drQUYgOv0wiyFt0IxYmfqxa%2F2t7l30ypUpXV4HwwwtzUJLf5tXp3o7f9bhnyZpNVyEW3sWK9yg%3D";
// const maxiUrl =
//   "https://suf.purs.gov.rs/v/?vl=A0tDUEZLUjdIS0NQRktSN0hgPAAAYDwAABwqeQQAAAAAAAABlkzUvogAAAAdc2gTrM7m8MXAVw5%2BAueGMiqCd7Lso9oMW85%2FL%2Bjj0thQcdWmPCjOh7VMVw1ebUBKIYFLsGOYBZpAcvA5RcBbYb1wbn0nMCAzin1ZM6zgGK%2FKg4CZFnLHe%2Bw6kIeRLL%2FoOSMQPgQo2wPSZXso3%2B8KIjKXue7iFjq3YQNEcGSekng1Yeouf%2BBbKp0qzwnR8%2Fany9X22dCbCMIv0HngtVlZtu8eqx%2BcqX%2FcNPYCLhd%2BlIKA6hwOjCtJt86S3TMr%2B%2Bn2fQ7i4eJUVR9E5tpXG6RQ%2B3RC%2F3Y2Xfn9at37ZPxCp6OpzchjFH9KTJ1EbO59As%2F5IiDxWVdM70Yx8ZrKG4OBk%2FVquN086gMW1ODjhqRrelpWAMyRqM7uKwHa3AQSFK5iQcJLo6z9%2F9gjQiF26IM4hiMjP%2B5yJsnXU0B%2F7jKmaVhgVyjeJegmqFHWFCXTLLGCUmRLIm1AcS9UrdqOgzxI8ZkAtI3Fd3r2WhJKOHLcOK7V%2BBv00UipV77VdLHqiO00%2FZ9JNwXWuvFsGxoxcdHGdpbprquKWVwPNCruGVRU7cUnTaTeMhfFxvJ7hiicQXg2Xr4Y44ZgsmIpA5%2BpWqAJUSm49gIKY3nGydfusMmm0yj1gJToMsZxmYK0YcYZYOjjv0de21TJe1v9wwB6UcOJocTklwwsI4s%2BvDJ7K00Eh86PU%2BrDMuKJ8jbzLwGzNQY%3D";

export function CreatePurchase({ data }: Pick<Extract<DrawerTypes, { type: "create_purchases" }>, "data">) {
  const { mutate } = useCreate<typeof data>("purchases");
  const { openDrawer } = useDrawer("modify_purchase");
  return (
    <div>
      <Button
        icon={Icons.add}
        label="Create"
        onClick={() =>
          mutate(
            { value: { url: data?.url || lidlUrl } },
            {
              onSuccess: (res) => openDrawer("Modify purchase", { id: res }, "full"),
            }
          )
        }
        variant="success"
      />
    </div>
  );
}

export function ModifyPurchase({ data }: { data: { id: string } }) {
  const { data: purchaseItems = [] } = useList<ModifyPurchaseItem>(
    { model: "purchase_items", fields: ["id", "title", "productId", "quantity"] },
    { urlSuffix: `${data.id}/modify`, enabled: !!data.id }
  );
  const { mutate } = useCreate("locations_products", { urlSuffix: "purchase-items" });
  const [, dispatch] = useTable<ModifyPurchaseItem>();
  const form = useForm({
    defaultValues: {
      products: purchaseItems.filter((item) => item.productId),
    },
    onSubmit: (p) => {
      const products = (p.value.products || []).map((product) => ({
        ...product,
        expirationDate: product.expirationDate ? formatStringToISO(product.expirationDate) : null,
      }));
      mutate({ value: { products } });
    },
    validators: {
      onSubmit: PurhcaseItemsModifySchema,
    },
  });
  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="flex h-full flex-col gap-y-4">
        <div className="flex max-h-[45%] flex-col gap-y-2">
          <Title hasBorder label="Items with matching products" size="xl" variant="info" />
          <Table<ModifyPurchaseItem>
            columns={columns(form)}
            data={purchaseItems.filter((item) => item.productId)}
            dispatch={dispatch}
          />
        </div>
        <div className="max-h-[45%]">
          <Table<ModifyPurchaseItem>
            columns={columns(form)}
            data={purchaseItems.filter((item) => !item.productId)}
            dispatch={dispatch}
            isCollapsible
            isInitialOpen={false}
            title="Items without matching products"
          />
        </div>
        <div className="mt-auto">
          <form.Subscribe<[boolean, boolean]>
            children={(p) => {
              return <Button icon={Icons.save} isDisabled={!p[0]} label="Modify" onClick={undefined} variant="success" />;
            }}
            selector={(state) => [state.canSubmit || state.isPristine, state.isSubmitting]}
          />
        </div>
      </div>
    </Form>
  );
}
