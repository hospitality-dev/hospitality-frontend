import {
  Button,
  createColumnHelper,
  fetchFunction,
  FormattedEntity,
  Icon,
  Icons,
  ProductCategoriesQuery,
  ProductsWithCountType,
  Table,
  Tabs,
  useBarcodeScanner,
  useDrawer,
  useList,
  useParams,
  useQuery,
  useTable,
} from "@hospitality/hospitality-ui";

type Entity = Pick<
  FormattedEntity<ProductsWithCountType>,
  | "id"
  | "title"
  | "categoryId"
  | "count"
  | "hasAboutToExpire"
  | "volume"
  | "volumeUnit"
  | "weight"
  | "weightUnit"
  | "brandTitle"
  | "manufacturerTitle"
  | "relations"
>;
const columnHelper = createColumnHelper<Entity>();

function ActionButton({ data }: { data: Entity }) {
  const { openDrawer: openManageInventoryDrawer } = useDrawer("manage_product_inventory");

  return (
    <div className="w-8">
      <Button
        allowedPlacements={["left", "left-start", "left-end"]}
        hasNoBorder
        icon={Icons.menu}
        isOutline
        items={[
          {
            id: "add_amount",
            onClick: () =>
              openManageInventoryDrawer("Add products", { type: "add_products", id: data.id, categoryId: data.categoryId }),
            title: "Add amount",
            icon: Icons.addItem,
          },
          {
            id: "remove_amount",
            onClick: () =>
              openManageInventoryDrawer("Remove products", {
                type: "remove_products",
                categoryId: data.categoryId,
                id: data.id,
                maxAmount: data.count,
              }),
            title: "Remove amount",
            icon: Icons.removeItem,
          },
          {
            id: "2",
            title: "Print QR codes",
            icon: Icons.qrCodes,
            onClick: async () => {
              const link = await fetchFunction<string>({
                model: "files",

                userReset: () => {},
                urlSuffix: `generate/products/qr-codes/${data.id}`,
              });
              if (link) window.open(link, "_blank");
            },
          },
        ]}
        onClick={undefined}
        size="xl"
        variant="primary"
      />
    </div>
  );
}

const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => (
      <div className="flex max-w-full items-center gap-x-2">
        <div>
          <Button
            hasNoBorder
            icon={info.row.getIsExpanded() ? Icons.arrowDown : Icons.arrowRight}
            isOutline
            onClick={() => info.row.toggleExpanded(!info.row.getIsExpanded())}
          />
        </div>
        {info.row.original.hasAboutToExpire && info.row.original.count ? (
          <div className="text-error">
            <Icon fontSize={24} icon={Icons.warning} />
          </div>
        ) : null}
        <div className="truncate font-medium">{info.getValue()}</div>
      </div>
    ),
    meta: {
      isStretch: true,
    },
  }),
  columnHelper.accessor("brandTitle", {
    header: "Brand",
    cell: (info) => info.getValue(),
    maxSize: 100,
  }),
  columnHelper.accessor("manufacturerTitle", {
    header: "Manufacturer",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("count", {
    header: "T. amount",
    cell: (info) => info.getValue(),
    maxSize: 100,
  }),
  columnHelper.accessor("volume", {
    header: "T. volume",
    cell: (info) => `${(info.getValue() || 0) * info.row.original.count} ${info.row.original.volumeUnit || ""}`,
    maxSize: 100,
  }),
  columnHelper.accessor("weight", {
    header: "T. weight",
    cell: (info) => `${(info.getValue() || 0) * info.row.original.count} ${info.row.original.weightUnit || ""}`,
    maxSize: 100,
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionButton data={row?.original} />,
    maxSize: 80,
    meta: {
      alignment: "center",
    },
  }),
];

export function ProductInventory() {
  const { openDrawer } = useDrawer("manage_product_inventory");
  const { setOnResult } = useBarcodeScanner();

  const { categoryId: active } = useParams({ from: "/inventory-management/$categoryId" });

  const { data } = useQuery(ProductCategoriesQuery);
  const { data: products, isPending } = useList<Entity>(
    {
      model: "products",
      fields: ["id", "title", "categoryId", "volume", "volumeUnit", "brandTitle", "manufacturerTitle"],
      relations: { brands: ["title"], manufacturers: ["title"] },
    },
    { enabled: !!active, urlSuffix: `category/${active}/active` }
  );
  const [state, dispatch] = useTable<Entity>();

  return (
    <div className="flex flex-col gap-y-2">
      <Tabs
        active={active}
        isNavControlled
        tabs={(data || []).map((cat) => ({ id: cat.id, title: cat.title, link: `/inventory-management/${cat.id}` }))}
      />
      <div className="self-end">
        <Button
          allowedPlacements={["bottom-end"]}
          icon={Icons.manage}
          items={[
            {
              id: "1",
              title: "Add amount",
              icon: Icons.addItem,
              onClick: () => openDrawer("Add products", { type: "add_products", categoryId: active }),
            },
            {
              id: "2",
              title: "Add (Barcode)",
              icon: Icons.barcode,
              onClick: () => {
                setOnResult((result) =>
                  openDrawer("Add products", {
                    type: "add_products",
                    categoryId: active,
                    barcode: result.getText(),
                  })
                );
              },
            },
            { id: "remove_by_barcode", title: "Remove (Barcode)", icon: Icons.bardcodeRemove },
          ]}
          label="Manage"
          onClick={undefined}
          variant="info"
        />
      </div>
      <Table
        columns={columns}
        data={products || []}
        dispatch={dispatch}
        isLoading={isPending}
        meta={state}
        type="product_grouped_by_expiration_date"
      />
    </div>
  );
}
