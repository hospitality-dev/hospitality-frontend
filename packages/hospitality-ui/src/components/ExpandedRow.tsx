import { createColumnHelper, Row } from "@tanstack/react-table";

import { Icons } from "../enums";
import { useList, useTable } from "../hooks";
import { LocationsProductsGroupedByExpirationType, PurchaseItemsType, StoresType, TableExpandableTypes } from "../types";
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
    size: 50,
  }),
  purchaseItemsColHelper.accessor("pricePerUnit", {
    header: "Price / unit",
    cell: (info) => (
      <span className="text-sm">
        {`${formatCurrency(info.getValue())}${info.row.original.unitOfMeasurement !== "Unknown" ? `/${info.row.original.unitOfMeasurement}` : ""}`.trim()}
      </span>
    ),
    minSize: 100,
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
    { model: "purchase_items", fields: ["id", "title", "pricePerUnit", "quantity", "unitOfMeasurement"] },
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

// #region Stores
const storesColHelper = createColumnHelper<StoresType>();
const storesColumns = [
  storesColHelper.accessor("title", {
    header: "Title",
    cell: (info) => <div className="truncate">{info.getValue()}</div>,
    minSize: 300,
  }),
];

function Stores({ parentId }: { parentId?: string }) {
  const { data } = useList<StoresType>(
    { model: "stores", fields: ["id", "title"] },
    { urlSuffix: `${parentId}`, enabled: !!parentId }
  );
  const [state, dispatch] = useTable<StoresType>();

  return (
    <div className="h-fit">
      <Table columns={storesColumns} data={data || []} dispatch={dispatch} hasNoHeader meta={state} />
    </div>
  );
}

// #endregion Stores

export function ExpandedRow({ id, type }: { id: string; type: TableExpandableTypes | null | undefined }) {
  return (
    <div className="h-fit">
      {type === "product_grouped_by_expiration_date" ? <ExpandedProductGroupedByExpirationDate productId={id} /> : null}
      {type === "purchases" ? <PurchaseItems parentId={id} /> : null}
      {type === "suppliers" ? <Stores parentId={id} /> : null}
    </div>
  );
}
