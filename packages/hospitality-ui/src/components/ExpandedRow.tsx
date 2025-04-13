import { createColumnHelper } from "@tanstack/react-table";

import { useList } from "../hooks";
import { LocationsProductsGroupedByExpirationType } from "../types";
import { formatISOToString } from "../utils";
import { Table } from "./Table";

const groupedByExpirationDateColHelper = createColumnHelper<LocationsProductsGroupedByExpirationType>();
const groupedByExpirationDateColumns = [
  groupedByExpirationDateColHelper.accessor("expirationDate", {
    header: "Expiration date",
    cell: (info) => {
      const value = info.getValue();
      return <span className="font-medium">{value ? formatISOToString(value) : ""}</span>;
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
    <div className="">
      <Table columns={groupedByExpirationDateColumns} data={data || []} />
    </div>
  );
}

export function ExpandedRow({ id, type }: { id: string; type: "product_grouped_by_expiration_date" | null | undefined }) {
  if (type === "product_grouped_by_expiration_date") return <ExpandedProductGroupedByExpirationDate productId={id} />;
  return null;
}
