import {
  Button,
  createColumnHelper,
  Icons,
  ProductsCategories,
  Table,
  useDrawer,
  useLoaderData,
} from "@hospitality/hospitality-ui";

const columnHelper = createColumnHelper<Pick<ProductsCategories, "id" | "title">>();

const columns = [
  columnHelper.accessor("title", { header: "", cell: (info) => info.getValue() }),

  columnHelper.display({
    id: "isActive",
    header: "",
    cell: () => (
      <div className="flex justify-end">
        <div className="w-24">
          <Button label="Active" onClick={undefined} variant="success" />
        </div>
      </div>
    ),
    minSize: 50,
    size: 50,
    maxSize: 50,
  }),
];

export function ProductSettings() {
  const categories = useLoaderData({ from: "/settings/products" });
  const products: Pick<ProductsCategories, "id" | "title">[] = [
    { id: "1", title: "Chicken" },
    { id: "2", title: "Heineken" },
    { id: "3", title: "Trout" },
    { id: "4", title: "Frozen trout" },
  ];
  const { openDrawer } = useDrawer();
  return (
    <div className="flex flex-col gap-y-2">
      <div className="ml-auto w-fit">
        <Button icon={Icons.add} label="Create category" onClick={undefined} variant="info" />
      </div>
      <ul className="flex flex-col gap-y-2">
        {categories?.map((category) => (
          <li className="flex flex-col">
            <Table
              key={category.id}
              action={{
                icon: Icons.add,
                onClick: openDrawer,
                label: "",
                variant: "info",
              }}
              columns={columns}
              data={products}
              isCollapsible
              isInitialOpen={false}
              title={category.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
