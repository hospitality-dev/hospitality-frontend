import {
  Button,
  createColumnHelper,
  Icons,
  ProductsCategories,
  Table,
  useDrawer,
  useList,
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
  const { categories: placeholderData, fields } = useLoaderData({ from: "/settings/products" });
  const { data: categories } = useList<ProductsCategories>({
    model: "products_categories",
    placeholderData,
    fields,
  });
  const products: Pick<ProductsCategories, "id" | "title">[] = [
    { id: "1", title: "Chicken" },
    { id: "2", title: "Heineken" },
    { id: "3", title: "Trout" },
    { id: "4", title: "Frozen trout" },
  ];
  const { openDrawer: openProductCategoriesDrawer } = useDrawer("Create product category", "products_categories");
  return (
    <div className="flex flex-col gap-y-2">
      <div className="ml-auto w-fit">
        <Button icon={Icons.add} label="Create category" onClick={openProductCategoriesDrawer} variant="info" />
      </div>
      <ul className="flex flex-col gap-y-2">
        {categories?.map((category) => (
          <li key={category.id} className="flex flex-col">
            <Table
              action={{
                icon: Icons.add,
                onClick: () => {},
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
