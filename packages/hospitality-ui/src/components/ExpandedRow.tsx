import { createColumnHelper } from "@tanstack/react-table";

import { useList } from "../hooks";
import { LocationsProductsGroupedByExpirationType, Variant } from "../types";
import { checkIsBefore, formatISOToString, getDayCountString, getDayDifferenceFromNow } from "../utils";
import { Table } from "./Table";

const groupedByExpirationDateColHelper = createColumnHelper<LocationsProductsGroupedByExpirationType & { variant?: Variant }>();
const groupedByExpirationDateColumns = [
  groupedByExpirationDateColHelper.accessor("expirationDate", {
    header: "Expiration date",
    cell: (info) => {
      const value = info.getValue();
      const differenceInDays = getDayDifferenceFromNow(value);
      return (
        <span className={`font-medium ${differenceInDays && differenceInDays <= 7 ? "text-error" : ""}`}>
          {value ? (
            <div className="flex items-center gap-x-1">
              <span>{formatISOToString(value)}</span>
              <span>({differenceInDays === 0 ? "Today" : getDayCountString(differenceInDays || 0)})</span>
            </div>
          ) : null}
        </span>
      );
    },
  }),
  groupedByExpirationDateColHelper.accessor("count", {
    header: "Count",
    cell: (info) => <span className="font-light">{info.getValue()}</span>,
  }),
];

export function ExpandedProductGroupedByExpirationDate({ productId }: { productId?: string }) {
  const { data } = useList<LocationsProductsGroupedByExpirationType>(
    { model: "locations_products", fields: ["expirationDate", "count"] },
    { urlSuffix: `${productId}/grouped/expiration-date`, enabled: !!productId }
  );
  return (
    <Table
      columns={groupedByExpirationDateColumns}
      data={(data || []).map((item) => ({
        ...item,
        variant: item.expirationDate && checkIsBefore({ date: item.expirationDate, days: 7 }) ? "error" : "primary",
      }))}
    />
  );
}

export function ExpandedRow({ id, type }: { id: string; type: "product_grouped_by_expiration_date" | null | undefined }) {
  if (type === "product_grouped_by_expiration_date") return <ExpandedProductGroupedByExpirationDate productId={id} />;
  return null;
}
