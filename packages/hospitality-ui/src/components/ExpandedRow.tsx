import { createColumnHelper, Row } from "@tanstack/react-table";

import { Icons } from "../enums";
import { useList, useTable } from "../hooks";
import { LocationsProductsGroupedByExpirationType, PurchaseItemsType, TableExpandableTypes } from "../types";
import {
  formatCurrency,
  formatISOToString,
  formatProductUnits,
  getDayCountString,
  getDayDifferenceFromNow,
  urlFunction,
} from "../utils";
import { Button } from "./Button";
import { Table } from "./Table";

// #region GroupedByExpiration
function GroupedByExpirationActions({
  row,
}: {
  row: Row<{
    productId: string;
    count: number;
    expirationDate?: string | null | undefined;
  }>;
}) {
  return (
    <span className="pl-2 font-light">
      <Button
        hasNoBorder
        icon={Icons.qrCodes}
        isDisabled
        isOutline
        onClick={async () => {
          const link = await urlFunction({
            id: row.original.productId,
            userReset: () => {},
            method: "POST",
            payload: JSON.stringify({ expirationDate: row.original.expirationDate }),
            urlSuffix: "expiration-products-qr-code",
          });
          window.open(link, "_blank");
        }}
      />
    </span>
  );
}
const groupedByExpirationDateColHelper = createColumnHelper<LocationsProductsGroupedByExpirationType>();
const groupedByExpirationDateColumns = [
  groupedByExpirationDateColHelper.accessor("expirationDate", {
    header: "Expiration date",
    cell: (info) => {
      const value = info.getValue();
      const differenceInDays = getDayDifferenceFromNow(value);
      return (
        <span className={`font-medium ${differenceInDays !== null && differenceInDays <= 7 ? "text-error" : ""}`}>
          {value ? (
            <span className="flex items-center gap-x-1">
              <span>{formatISOToString(value)}</span>
              <span>({differenceInDays === 0 ? "Today" : getDayCountString(differenceInDays || 0)})</span>
            </span>
          ) : null}
        </span>
      );
    },
  }),
  groupedByExpirationDateColHelper.accessor("count", {
    header: "Amount",
    cell: (info) => <span className="font-light">{info.getValue()}</span>,
    maxSize: 150,

    meta: {
      isCentered: true,
    },
  }),
  groupedByExpirationDateColHelper.accessor("volume", {
    header: "Volume",
    cell: (info) => (
      <span className="font-light">
        {(info.getValue() || 0) * info.row.original.count} {info.row.original.volumeUnit || ""}
      </span>
    ),
    maxSize: 150,

    meta: {
      isCentered: true,
    },
  }),
  groupedByExpirationDateColHelper.accessor("weight", {
    header: "Weight",
    cell: (info) => (
      <span className="font-light">
        {(info.getValue() || 0) * info.row.original.count} {info.row.original.weightUnit || ""}
      </span>
    ),
    maxSize: 150,

    meta: {
      isCentered: true,
    },
  }),
  groupedByExpirationDateColHelper.display({
    id: "actions",
    header: () => <span className="pl-2">Actions</span>,
    cell: GroupedByExpirationActions,
    maxSize: 90,
    meta: {
      isCentered: true,
    },
  }),
];

function ExpandedProductGroupedByExpirationDate({ productId }: { productId?: string }) {
  const { data } = useList<LocationsProductsGroupedByExpirationType>(
    { model: "locations_products", fields: ["expirationDate", "count"] },
    { urlSuffix: `${productId}/grouped/expiration-date`, enabled: !!productId }
  );
  const [state, dispatch] = useTable<LocationsProductsGroupedByExpirationType>();

  return <Table columns={groupedByExpirationDateColumns} data={data || []} dispatch={dispatch} meta={state} />;
}
// #endregion GroupedByExpiration

// #region PurchaseItems
const purchaseItemsColHelper = createColumnHelper<PurchaseItemsType>();
const purchaseItemsColumns = [
  purchaseItemsColHelper.accessor("title", {
    header: "Title",
    cell: (info) =>
      info
        .getValue()
        .replaceAll(/\/(KOM|KG|L|G|ML)\b/g, "")
        .replaceAll(/\s*\((Е|Ђ)\)/g, ""),
    minSize: 300,
  }),
  purchaseItemsColHelper.accessor("quantity", {
    header: "Amount",
    cell: (info) => {
      const m = info.row.original.title.match(/(\d*)(KG|L|G|ML|OZ|LB)\b/)?.[0];
      return `${info.getValue()} ${m || formatProductUnits(info.row.original)}`.toLowerCase();
    },
    size: 80,
  }),
  purchaseItemsColHelper.accessor("pricePerUnit", {
    header: "Price / unit",
    cell: (info) => formatCurrency(info.getValue()),
    size: 100,
  }),
  purchaseItemsColHelper.display({
    id: "total",
    header: "Total",
    cell: (info) => formatCurrency(info.row.original.pricePerUnit * info.row.original.quantity),
    size: 100,
  }),

  // purchaseItemsColHelper.display({
  //   id: "actions",
  //   header: () => <span className="pl-2">Actions</span>,
  //   cell: GroupedByExpirationActions,
  //   maxSize: 90,
  //   meta: {
  //     isCentered: true,
  //   },
  // }),
];

function PurchaseItems({ parentId }: { parentId?: string }) {
  const { data } = useList<PurchaseItemsType>(
    { model: "purchase_items", fields: ["id", "title", "pricePerUnit", "quantity"] },
    { urlSuffix: `${parentId}`, enabled: !!parentId }
  );
  const [state, dispatch] = useTable<PurchaseItemsType>();

  return (
    <div className="h-[36rem]">
      <Table columns={purchaseItemsColumns} data={data || []} dispatch={dispatch} meta={state} />
    </div>
  );
}
// #endregion PurchaseItems
export function ExpandedRow({ id, type }: { id: string; type: TableExpandableTypes | null | undefined }) {
  if (type === "product_grouped_by_expiration_date") return <ExpandedProductGroupedByExpirationDate productId={id} />;
  if (type === "purchase_items") return <PurchaseItems parentId={id} />;
  return null;
}
