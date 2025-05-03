import { CellContext, createColumnHelper, Row } from "@tanstack/react-table";
import { useState } from "react";

import { Icons } from "../enums";
import { useCreate, useDelete, useList, useTable } from "../hooks";
import {
  ContactType,
  LocationsProductsGroupedByExpirationType,
  PurchaseItemsType,
  StoresType,
  TableExpandableTypes,
} from "../types";
import { BrandsType } from "../types/brandTypes";
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
    minSize: 125,
    maxSize: 300,
    cell: (info) => {
      const value = info.getValue();
      const differenceInDays = getDayDifferenceFromNow(value);
      return (
        <div
          className={`line-clamp-1 font-medium @min-xs/table-cell:max-w-full ${differenceInDays !== null && differenceInDays <= 7 && differenceInDays > 0 ? "text-warning" : ""} ${differenceInDays !== null && differenceInDays <= 0 ? "text-error" : ""} `}>
          {value ? (
            <div className="items-center gap-x-1">
              <span>{formatISOToString(value)}</span>
              <span className="@max-[150px]/table-cell:hidden">
                ({differenceInDays === 0 ? "Today" : getDayCountString(differenceInDays || 0)})
              </span>
            </div>
          ) : null}
        </div>
      );
    },
  }),
  groupedByExpirationDateColHelper.accessor("count", {
    header: "Amount",
    cell: (info) => <span className="font-light">{info.getValue()}</span>,
    maxSize: 100,
    minSize: 80,
  }),
  groupedByExpirationDateColHelper.accessor("purchasedAt", {
    header: "Purchase date",
    minSize: 115,
    meta: {
      alignment: "left",
    },
    cell: (info) => {
      const value = info.getValue();
      const differenceInDays = getDayDifferenceFromNow(value);
      if (!value) return "Unknown";

      return (
        <span className="flex items-center gap-x-1 truncate @min-[150px]/table-cell:text-sm">
          <span>{formatISOToString(value || "")}</span>
          <span className="@max-[150px]/table-cell:hidden">{getDayCountString(differenceInDays || 0)}</span>
        </span>
      );
    },
  }),
  groupedByExpirationDateColHelper.accessor("createdAt", {
    header: "Added to system",
    meta: {
      alignment: "left",
    },
    minSize: 130,
    cell: (info) => {
      const value = info.getValue();
      const differenceInDays = getDayDifferenceFromNow(value);
      return (
        <span className="flex items-center gap-x-1 truncate @min-[150px]/table-cell:text-sm">
          <span>{formatISOToString(value || "")}</span>
          <span className="@max-[150px]/table-cell:hidden">({getDayCountString(differenceInDays || 0)})</span>
        </span>
      );
    },
  }),
  groupedByExpirationDateColHelper.accessor("volume", {
    header: "Volume",
    cell: (info) => (
      <span className="font-light">
        {(info.getValue() || 0) * info.row.original.count} {info.row.original.volumeUnit || ""}
      </span>
    ),
    meta: {
      alignment: "center",
    },
    minSize: 80,
  }),
  groupedByExpirationDateColHelper.accessor("weight", {
    header: "Weight",
    cell: (info) => (
      <span className="font-light">
        {(info.getValue() || 0) * info.row.original.count} {info.row.original.weightUnit || ""}
      </span>
    ),
    minSize: 80,
    meta: {
      alignment: "center",
    },
  }),
  groupedByExpirationDateColHelper.display({
    id: "actions",
    header: () => <span className="pl-2">Actions</span>,
    cell: GroupedByExpirationActions,
    minSize: 80,
    maxSize: 80,
    meta: {
      alignment: "center",
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
    cell: (info) => (
      <div className="truncate">
        {info
          .getValue()
          .replaceAll(/\/(KOM|KG|L|G|ML)\b/g, "")
          .replaceAll(/\s*\((Е|Ђ)\)/g, "")}
      </div>
    ),
    meta: {},
    minSize: 300,
  }),
  purchaseItemsColHelper.accessor("quantity", {
    header: "Amount",
    cell: (info) => {
      const m = info.row.original.title.match(/(\d*)(KG|L|G|ML|OZ|LB)\b/)?.[0];
      return `${info.getValue()} ${m || formatProductUnits(info.row.original)}`.toLowerCase();
    },
    minSize: 120,
    maxSize: 120,
  }),
  purchaseItemsColHelper.accessor("pricePerUnit", {
    header: "Price / unit",
    cell: (info) => (
      <span className="text-sm">
        {`${formatCurrency(info.getValue())}${info.row.original.unitOfMeasurement !== "Unknown" ? `/${info.row.original.unitOfMeasurement}` : ""}`.trim()}
      </span>
    ),
    minSize: 150,
    maxSize: 150,
  }),
  purchaseItemsColHelper.display({
    id: "total",
    header: "Total",
    cell: (info) => formatCurrency(info.row.original.pricePerUnit * info.row.original.quantity),
    minSize: 150,
    maxSize: 150,
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
    <div className="h-fit">
      <Table columns={purchaseItemsColumns} data={data || []} dispatch={dispatch} meta={state} />
    </div>
  );
}
// #endregion PurchaseItems

// #region Stores
function StoresActionButton(info: CellContext<StoresType, unknown>) {
  const [isActive, setIsActive] = useState(false);
  const { data: contacts = [] } = useList<ContactType>(
    { model: "contacts", fields: ["id", "title", "value", "contactType"] },
    { urlSuffix: `store/${info.row.original.id}`, enabled: isActive }
  );
  return (
    <div
      className="w-fit"
      onMouseEnter={() => {
        if (!isActive) setIsActive(true);
      }}>
      <Button
        allowedPlacements={["left", "left-start", "left-end"]}
        hasNoBorder
        icon={Icons.menu}
        isOutline
        items={[
          {
            id: "address",
            title: "Address",
            allowedPlacements: ["left", "left-start", "left-end", "bottom-start", "bottom-end"],
            icon: Icons.location,
            subItems: contacts
              .filter((c) => c.contactType.includes("address"))
              .map((c) => ({
                id: c.id,
                title: c.value,
                subItems: [
                  { id: "map", title: "View on map", icon: Icons.map },
                  {
                    id: "google_map",
                    title: "View in Google Maps",
                    icon: Icons.googleMaps,
                    onClick: () => {
                      const address = encodeURIComponent(
                        `${info.row.original.title} ${c.value}`.replaceAll(/^\d+(-\d+)?\s?-?/g, "").trim()
                      );
                      window.open(`https://www.google.com/maps?q=${address}`, "_blank");
                    },
                  },
                ],
              })),
          },
        ]}
        onClick={() => {}}
        size="lg"
      />
    </div>
  );
}
const storesColHelper = createColumnHelper<StoresType>();
const storesColumns = [
  storesColHelper.accessor("title", {
    header: "Title",
    cell: (info) => <div className="truncate">{info.getValue()}</div>,
    minSize: 300,
  }),
  storesColHelper.display({
    id: "actions",
    cell: StoresActionButton,
    maxSize: 55,

    meta: {
      alignment: "center",
    },
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

// #region Brands
const brandsColHelper = createColumnHelper<BrandsType>();

function EnabledButton(info: CellContext<BrandsType, unknown>) {
  const { mutate: create } = useCreate("locations_available_brands", { invalidateModels: ["brands"] });
  const { mutate: deleteMutation } = useDelete("locations_available_brands", { invalidateModels: ["brands"] });
  return (
    <Button
      label={info.row.original.availabilityId ? "Enabled" : "Disabled"}
      onClick={() =>
        info.row.original.availabilityId
          ? deleteMutation(info.row.original.availabilityId)
          : create({ value: { brandId: info.row.original.id } })
      }
      variant={info.row.original.availabilityId ? "success" : "primary"}
    />
  );
}

const brandsColumns = [
  brandsColHelper.accessor("title", {
    header: "Brand title",
    cell: (info) => <div className="truncate">{info.getValue()}</div>,
    minSize: 300,
  }),
  brandsColHelper.accessor("availabilityId", {
    header: "Enabled",
    cell: EnabledButton,
    meta: {
      alignment: "center",
    },
    maxSize: 125,
  }),
  // brandsColHelper.display({
  //   id: "actions",
  //   cell: () => (
  //     <div className="mr-2.5 w-fit">
  //       <Button hasNoBorder icon={Icons.location} isDisabled isOutline onClick={() => {}} size="lg" />
  //     </div>
  //   ),
  //   maxSize: 100,
  //   meta: {
  //     alignment: "right",
  //   },
  // }),
];

function Brands({ parentId }: { parentId?: string }) {
  const { data } = useList<BrandsType>(
    { model: "brands", fields: ["id", "title", "companyId"], sort: { field: "title", type: "asc" } },
    { urlSuffix: `${parentId}`, enabled: !!parentId }
  );
  const [state, dispatch] = useTable<BrandsType>();

  return (
    <div className="h-fit">
      <Table columns={brandsColumns} data={data || []} dispatch={dispatch} meta={state} />
    </div>
  );
}
// #endregion Manufacturers
export function ExpandedRow({ id, type }: { id: string; type: TableExpandableTypes | null | undefined }) {
  return (
    <div className="expandedContainer w-full bg-gray-300 p-2">
      {type === "product_grouped_by_expiration_date" ? <ExpandedProductGroupedByExpirationDate productId={id} /> : null}
      {type === "purchases" ? <PurchaseItems parentId={id} /> : null}
      {type === "suppliers" ? <Stores parentId={id} /> : null}
      {type === "manufacturers" ? <Brands parentId={id} /> : null}
    </div>
  );
}
