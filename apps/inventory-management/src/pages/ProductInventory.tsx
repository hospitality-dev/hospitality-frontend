import {
  Button,
  createColumnHelper,
  Icon,
  Icons,
  ProductCategoriesQuery,
  ProductsWithCountType,
  Table,
  Tabs,
  urlFunction,
  useBarcodeScanner,
  useDrawer,
  useList,
  useParams,
  useQuery,
} from "@hospitality/hospitality-ui";

type Entity = Pick<ProductsWithCountType, "id" | "title" | "categoryId" | "count" | "hasAboutToExpire">;
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
            icon: Icons.qrCode,
            onClick: async () => {
              const link = await urlFunction({
                id: data.id,
                userReset: () => {},
                urlSuffix: "product-qr-code",
              });
              window.open(link, "_blank");
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
  columnHelper.accessor("count", {
    header: "Amount",
    cell: (info) => (
      <div className="flex items-center gap-x-2">
        <div>
          <Button
            hasNoBorder
            icon={info.row.getIsExpanded() ? Icons.arrowDown : Icons.arrowRight}
            isOutline
            onClick={() => info.row.toggleExpanded(!info.row.getIsExpanded())}
          />
        </div>
        {info.row.original.hasAboutToExpire ? (
          <div className="text-error">
            <Icon fontSize={24} icon={Icons.warning} />
          </div>
        ) : null}
        {info.getValue()}
      </div>
    ),
    maxSize: 100,
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionButton data={row?.original} />,
    meta: {
      isCentered: true,
    },
    minSize: 100,
    size: 100,
    maxSize: 100,
  }),
];

export function ProductInventory() {
  const { openDrawer } = useDrawer("manage_product_inventory");
  const { setOnResult } = useBarcodeScanner();

  const { categoryId: active } = useParams({ from: "/inventory-management/$categoryId" });

  const { data } = useQuery(ProductCategoriesQuery);
  const { data: products, isPending } = useList<ProductsWithCountType>(
    { model: "products", fields: ["id", "title", "categoryId"] },
    { enabled: !!active, urlSuffix: `category/${active}/active` }
  );

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
      <Table columns={columns} data={products || []} isLoading={isPending} type="product_grouped_by_expiration_date" />
    </div>
  );
}
