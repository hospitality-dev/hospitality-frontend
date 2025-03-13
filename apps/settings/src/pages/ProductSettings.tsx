import {
  Button,
  createColumnHelper,
  Icons,
  Products,
  ProductsCategories,
  Table,
  useDrawer,
  useList,
  useLoaderData,
} from "@hospitality/hospitality-ui";
import { useState } from "react";

const columnHelper = createColumnHelper<Pick<ProductsCategories, "id" | "title">>();

const columns = [
  columnHelper.accessor("title", { header: "", cell: (info) => info.getValue() }),

  columnHelper.display({
    id: "isActive",
    header: "",
    cell: () => (
      <div className="flex h-full items-center justify-end">
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

function ProductSettingsCategory({ id, title, isDefault }: Pick<ProductsCategories, "id" | "title" | "isDefault">) {
  const { openDrawer: openProductDrawer } = useDrawer<"products">("Create product", "products");
  const [isOpen, setIsOpen] = useState(false);
  const query = useList<Products>({ model: "products", fields: ["id", "title"] }, { enabled: isOpen, urlSuffix: id });

  return (
    <li className={`flex flex-col ${isDefault ? "rounded-md border border-gray-300" : ""}`}>
      <Table
        action={{
          icon: Icons.add,
          onClick: () => openProductDrawer({ categoryId: id }),
          label: "",
          variant: "info",
        }}
        columns={columns}
        data={query?.data || []}
        isCollapsible
        isInitialOpen={isOpen}
        isLoading={query.isRefetching}
        onExpand={() => setIsOpen(!isOpen)}
        title={title}
        titleVariant="primary"
      />
    </li>
  );
}

export function ProductSettings() {
  const { categories: placeholderData, fields } = useLoaderData({ from: "/settings/products" });

  const { data: categories } = useList<ProductsCategories>({
    model: "products_categories",
    placeholderData,
    fields,
  });

  const { openDrawer: openProductCategoriesDrawer } = useDrawer("Create product category", "products_categories");
  return (
    <div className="flex flex-col gap-y-2">
      <div className="ml-auto w-fit">
        <Button icon={Icons.add} label="Create category" onClick={() => openProductCategoriesDrawer()} variant="info" />
      </div>
      <ul className="flex flex-col gap-y-2">
        {categories?.map((category) => (
          <ProductSettingsCategory key={category.id} id={category.id} isDefault={category.isDefault} title={category.title} />
        ))}
      </ul>
    </div>
  );
}
