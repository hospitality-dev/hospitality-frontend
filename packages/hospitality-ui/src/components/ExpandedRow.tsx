import { createColumnHelper, Row } from "@tanstack/react-table";

import { Icons } from "../enums";
import { useList, useTable } from "../hooks";
import { LocationsProductsGroupedByExpirationType } from "../types";
import { formatISOToString, getDayCountString, getDayDifferenceFromNow, urlFunction } from "../utils";
import { Button } from "./Button";
import { Table } from "./Table";

function GroupedByExpiractionActions({
  row,
}: {
  row: Row<{
    productId: string;
    count: number;
    expirationDate?: string | null | undefined;
  }>;
}) {
  return (
    <span className="font-light">
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
    header: () => <span className="text-center">Actions</span>,
    cell: GroupedByExpiractionActions,
    maxSize: 90,
    meta: {
      isCentered: true,
    },
  }),
];

export function ExpandedProductGroupedByExpirationDate({ productId }: { productId?: string }) {
  const { data } = useList<LocationsProductsGroupedByExpirationType>(
    { model: "locations_products", fields: ["expirationDate", "count"] },
    { urlSuffix: `${productId}/grouped/expiration-date`, enabled: !!productId }
  );
  const [state, dispatch] = useTable<LocationsProductsGroupedByExpirationType>();

  return <Table columns={groupedByExpirationDateColumns} data={data || []} dispatch={dispatch} meta={state} />;
}

export function ExpandedRow({ id, type }: { id: string; type: "product_grouped_by_expiration_date" | null | undefined }) {
  if (type === "product_grouped_by_expiration_date") return <ExpandedProductGroupedByExpirationDate productId={id} />;
  return null;
}
