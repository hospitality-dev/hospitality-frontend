import {
  Button,
  createColumnHelper,
  Icons,
  ProductCategoriesQuery,
  ProductsWithCount,
  Table,
  Tabs,
  useBarcodeScanner,
  useDrawer,
  useList,
  useParams,
  useQuery,
} from "@hospitality/hospitality-ui";

type Entity = Pick<ProductsWithCount, "id" | "title" | "categoryId" | "count">;
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
            icon: Icons["add-item"],
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
            icon: Icons["remove-item"],
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
  columnHelper.accessor("count", { header: "Amount", cell: (info) => info.getValue(), maxSize: 100 }),
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
  const { data: products, isPending } = useList<ProductsWithCount>(
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
              icon: Icons["add-item"],
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
            { id: "remove_by_barcode", title: "Remove (Barcode)", icon: Icons["barcode-remove"] },
          ]}
          label="Manage"
          onClick={undefined}
          variant="info"
        />
      </div>
      <Table columns={columns} data={products || []} isLoading={isPending} />
    </div>
  );
}
